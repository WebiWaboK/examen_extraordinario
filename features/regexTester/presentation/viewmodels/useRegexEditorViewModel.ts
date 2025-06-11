import { useState } from 'react';

export const useRegexEditorViewModel = () => {
  const [pattern, setPattern] = useState('');
  const [text, setText] = useState('');
  const [matches, setMatches] = useState<string[]>([]);

  const handlePatternChange = (value: string) => {
    setPattern(value);
    testRegex(value, text);
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
    } catch (error) {
      setMatches([]);
    }
  };

  return {
    pattern,
    text,
    matches,
    handlePatternChange,
    handleTextChange,
  };
};
