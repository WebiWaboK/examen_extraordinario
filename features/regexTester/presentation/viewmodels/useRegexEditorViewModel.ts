import { useState, useEffect, useRef } from 'react';
import { RegexASTNode } from '../../domain/entities/RegexASTNode';
import { parseRegex } from '../../data/repositories/regexEvaluatorImpl';
import { useRecentPatternsViewModel } from './useRecentPatternsViewModel';

export const useRegexEditorViewModel = () => {
  const [pattern, setPattern] = useState('');
  const [text, setText] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [regexError, setRegexError] = useState<string | null>(null);
  const [ast, setAst] = useState<RegexASTNode[]>([]);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string>('');
  const { save: saveRecent } = useRecentPatternsViewModel();

  const handlePatternChange = (value: string) => {
    setPattern(value);
    testRegex(value, text);

    try {
      const astResult = parseRegex(value);
      setAst(astResult);
      setRegexError(null);

      // ✅ Si está bien, se espera 5s sin escribir para guardar
      if (timerRef.current) clearTimeout(timerRef.current);
      if (value.trim() !== '' && value !== lastSavedRef.current) {
        timerRef.current = setTimeout(async () => {
          await saveRecent(value);
          lastSavedRef.current = value;
        }, 5000);
      }

    } catch (err: any) {
      setAst([]);
      setRegexError(err.message);
      if (timerRef.current) clearTimeout(timerRef.current); // 🛑 Cancela si tiene error
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
      if (timerRef.current) clearTimeout(timerRef.current);
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
