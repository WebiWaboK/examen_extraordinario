import { RegexASTNode } from '../../domain/entities/RegexASTNode';

export function parseRegex(pattern: string): RegexASTNode[] {
  let index = 0;

  function peek(): string {
    return pattern[index];
  }

  function next(): string {
    return pattern[index++];
  }

  function parseEscaped(): string {
    const char = next();
    if (char === 'd') return '\\d';
    if (char === 'w') return '\\w';
    if (char === 's') return '\\s';
    return '\\' + char; // fallback
  }

  function parseQuantifier(): { min: number; max: number } | null {
    if (peek() === '{') {
      let quantifier = '';
      while (peek() !== '}' && index < pattern.length) {
        quantifier += next();
      }
      quantifier += next(); // consume '}'

      const match = quantifier.match(/\{(\d+)(,(\d+)?)?\}/);
      if (match) {
        const min = parseInt(match[1], 10);
        const max = match[3] ? parseInt(match[3], 10) : (match[2] ? Infinity : min);
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
    while (index < pattern.length) {
      const char = peek();

      if (char === ')') {
        next();
        break;
      }

      if (char === '(') {
        next();
        const groupChildren = parseGroup();
        children.push({ type: 'group', children: groupChildren });
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
        next(); // consume '\'
        node = { type: 'literal', value: parseEscaped() };
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
