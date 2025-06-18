import { RegexASTNode } from '../../domain/entities/RegexASTNode';

export function parseRegex(pattern: string): RegexASTNode[] {
  let index = 0;

  function peek(): string {
    return pattern[index];
  }

  function next(): string {
    return pattern[index++];
  }

  function eof(): boolean {
    return index >= pattern.length;
  }

  function parseEscaped(): string {
    const char = next();
    if ('dwsDWSbB'.includes(char)) return '\\' + char;
    if ('.+*?^$|()[]{}'.includes(char)) return '\\' + char;
    return '\\' + char;
  }

  function parseCharacterClass(): RegexASTNode {
    let content = '';
    next(); // consume '['
    if (peek() === '^') content += next();
    while (!eof() && peek() !== ']') {
      if (peek() === '\\') {
        next();
        content += '\\' + next();
      } else {
        content += next();
      }
    }
    next(); // consume ']'
    return { type: 'characterClass', value: content };
  }

  function parseQuantifier(): { min: number; max: number } | null {
    if (peek() === '{') {
      let quantifier = '';
      while (!eof() && peek() !== '}') {
        quantifier += next();
      }
      if (peek() === '}') quantifier += next();
      const match = quantifier.match(/\{(\d+)(,(\d+)?)?\}/);
      if (match) {
        const min = parseInt(match[1], 10);
        const max = match[3]
          ? parseInt(match[3], 10)
          : match[2]
          ? Infinity
          : min;
        return { min, max };
      }
    } else if (peek() === '*') {
      next();
      return { min: 0, max: Infinity };
    } else if (peek() === '+') {
      next();
      return { min: 1, max: Infinity };
    } else if (peek() === '?') {
      next();
      return { min: 0, max: 1 };
    }
    return null;
  }

  function parseGroup(): RegexASTNode[] {
    const children: RegexASTNode[] = [];

    while (!eof()) {
      const char = peek();

      if (char === ')') {
        next(); // consume ')'
        break;
      }

      if (char === '(') {
        next(); // consume '('
        const groupChildren = parseGroup();
        const groupNode: RegexASTNode = { type: 'group', children: groupChildren };
        const quant = parseQuantifier();
        if (quant) {
          children.push({ type: 'quantifier', min: quant.min, max: quant.max, child: groupNode });
        } else {
          children.push(groupNode);
        }
        continue;
      }

      if (char === '^' || char === '$') {
        next();
        children.push({ type: 'anchor', kind: char });
        continue;
      }

      if (char === '|') {
        next();
        const left = [...children];
        const right = parseGroup();
        return [{ type: 'alternation', options: [left, right] }];
      }

      let node: RegexASTNode;

      if (char === '\\') {
        next();
        node = { type: 'literal', value: parseEscaped() };
      } else if (char === '[') {
        node = parseCharacterClass();
      } else if ('*+?{}'.includes(char)) {
        throw new Error(`Cuantificador "${char}" inesperado sin valor previo`);
      } else {
        node = { type: 'literal', value: next() };
      }

      const quant = parseQuantifier();
      if (quant) {
        children.push({ type: 'quantifier', min: quant.min, max: quant.max, child: node });
      } else {
        children.push(node);
      }
    }

    return children;
  }

  return parseGroup();
}
