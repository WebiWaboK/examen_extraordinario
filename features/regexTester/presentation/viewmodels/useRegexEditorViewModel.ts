import { useState } from 'react';
import { RegexASTNode } from '../../domain/entities/RegexASTNode';
import { parseRegex } from '../../data/repositories/regexEvaluatorImpl';

export const useRegexEditorViewModel = () => {
  const [pattern, setPattern] = useState('');
  const [text, setText] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [regexError, setRegexError] = useState<string | null>(null);
  const [ast, setAst] = useState<RegexASTNode[]>([]);

  const handlePatternChange = (value: string) => {
    setPattern(value);
    testRegex(value, text);
    try {
      const ast = parseRegex(value);
      setAst(ast);
      setRegexError(null);
    } catch (err: any) {
      setAst([]);
      setRegexError(err.message);
    }
  };

  const handleTextChange = (value: string) => {
    setText(value);
    testRegex(pattern, value);
  };

  const testRegex = (pattern: string, text: string) => {
    try {
      const regex = new RegExp(pattern, 'g');
      const results = [...text.matchAll(regex)].map(match => match[0]);
      setMatches(results);
      setRegexError(null);
    } catch (err: any) {
      setMatches([]);
      setRegexError(err.message);
    }
  };

  return {
    pattern,
    text,
    matches,
    regexError,
    ast,
    handlePatternChange,
    handleTextChange,
  };
};
