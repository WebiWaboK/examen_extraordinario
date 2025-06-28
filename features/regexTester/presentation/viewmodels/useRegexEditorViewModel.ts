import { useState, useEffect, useRef } from 'react';
import { RegexASTNode } from '../../domain/entities/RegexASTNode';
import { parseRegex } from '../../data/repositories/regexEvaluatorImpl';
import { saveRecentPattern } from '../../data/repositories/regexPersistence';

export const useRegexEditorViewModel = () => {
  const [pattern, setPattern] = useState('');
  const [text, setText] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [regexError, setRegexError] = useState<string | null>(null);
  const [ast, setAst] = useState<RegexASTNode[]>([]);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string>('');

  const handlePatternChange = (value: string) => {
    setPattern(value);
    testRegex(value, text);

    try {
      const parsed = parseRegex(value);
      setAst(parsed);
      setRegexError(null);

      // Guardar si la expresión es válida, no vacía y diferente a la última guardada
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (value.trim() === '' || value === lastSavedRef.current) return;

      debounceRef.current = setTimeout(async () => {
        await saveRecentPattern(value);
        lastSavedRef.current = value;
      }, 5000);

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

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

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
