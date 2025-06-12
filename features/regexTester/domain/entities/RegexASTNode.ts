export type RegexASTNode =
  | { type: 'literal'; value: string }
  | { type: 'group'; children: RegexASTNode[] }
  | { type: 'quantifier'; min: number; max: number; child: RegexASTNode }
  | { type: 'alternation'; options: RegexASTNode[][] }
  | { type: 'anchor'; kind: '^' | '$' };
