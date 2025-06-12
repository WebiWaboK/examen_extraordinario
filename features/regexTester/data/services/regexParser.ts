import { RegexASTNode } from '../../domain/entities/RegexASTNode';

export function parseRegex(pattern: string): RegexASTNode[] {
  let index = 0;

  function parse(): RegexASTNode[] {
    const nodes: RegexASTNode[] = [];

    while (index < pattern.length) {
      const char = pattern[index];

      if (char === '(') {
        index++; // skip (
        const groupChildren = parse();
        nodes.push({ type: 'group', children: groupChildren });
      } else if (char === ')') {
        index++; // skip )
        break;
      } else if (char === '|') {
        index++; // skip |
        const right = parse();
        return [
          {
            type: 'alternation',
            options: [nodes, right],
          },
        ];
      } else if (char === '*') {
        index++;
        const last = nodes.pop();
        if (last) {
          nodes.push({ type: 'quantifier', min: 0, max: Infinity, child: last });
        }
      } else if (char === '+') {
        index++;
        const last = nodes.pop();
        if (last) {
          nodes.push({ type: 'quantifier', min: 1, max: Infinity, child: last });
        }
      } else if (char === '?') {
        index++;
        const last = nodes.pop();
        if (last) {
          nodes.push({ type: 'quantifier', min: 0, max: 1, child: last });
        }
      } else if (char === '^' || char === '$') {
        index++;
        nodes.push({ type: 'anchor', kind: char });
      } else {
        index++;
        nodes.push({ type: 'literal', value: char });
      }
    }

    return nodes;
  }

  return parse();
}
