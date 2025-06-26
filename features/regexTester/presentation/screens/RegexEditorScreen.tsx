import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { RegexEditor } from '../components/organisms/RegexEditor';
import { RegexASTNode } from '../../domain/entities/RegexASTNode';
import { parseRegex } from '../../data/repositories/regexEvaluatorImpl';

export default function RegexEditorScreen() {
  const [pattern, setPattern] = useState('');
  const [text, setText] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [regexError, setRegexError] = useState<string | null>(null);
  const [ast, setAst] = useState<RegexASTNode[]>([]);

  const handlePatternChange = (value: string) => {
    setPattern(value);
    testRegex(value, text);

    try {
      const astResult = parseRegex(value);
      setAst(astResult);
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
      const results = [...text.matchAll(regex)].map((m) => m[0]);
      setMatches(results);
      setRegexError(null);
    } catch (err: any) {
      setMatches([]);
      setRegexError(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <RegexEditor
        pattern={pattern}
        text={text}
        matches={matches}
        regexError={regexError}
        ast={ast}
        onPatternChange={handlePatternChange}
        onTextChange={handleTextChange}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});
