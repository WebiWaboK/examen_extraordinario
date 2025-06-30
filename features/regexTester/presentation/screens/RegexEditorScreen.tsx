import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { RegexEditor } from '../components/organisms/RegexEditor';
import { RegexASTNode } from '../../domain/entities/RegexASTNode';
import { parseRegex } from '../../data/repositories/regexEvaluatorImpl';
import { useRecentPatternsViewModel } from '../viewmodels/useRecentPatternsViewModel';
import { RecentPatternList } from '../components/molecules/RecentPatternList';

export default function RegexEditorScreen() {
  const [pattern, setPattern] = useState('');
  const [text, setText] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [regexError, setRegexError] = useState<string | null>(null);
  const [ast, setAst] = useState<RegexASTNode[]>([]);

  const { recentPatterns, save, clear } = useRecentPatternsViewModel();

  const handlePatternChange = (value: string) => {
    setPattern(value);
    testRegex(value, text);

    try {
      const astResult = parseRegex(value);
      setAst(astResult);
      setRegexError(null);
      save(value);
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <RegexEditor
          pattern={pattern}
          text={text}
          matches={matches}
          regexError={regexError}
          ast={ast}
          onPatternChange={handlePatternChange}
          onTextChange={handleTextChange}
        />

        {recentPatterns.length > 0 && pattern.trim() === '' && (
          <RecentPatternList
            patterns={recentPatterns.slice(0, 5)}
            onSelect={setPattern}
            onClear={clear}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingBottom: 32,
  },
});
