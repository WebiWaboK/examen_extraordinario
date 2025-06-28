import React, { useState, useEffect, useRef } from 'react';
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

  const { recentPatterns, save } = useRecentPatternsViewModel();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePatternChange = (value: string) => {
    setPattern(value);
    testRegex(value, text);

    try {
      const astResult = parseRegex(value);
      setAst(astResult);
      setRegexError(null);

      // Debounce: solo guardar si es una expresión válida
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        save(value);
      }, 5000);

    } catch (err: any) {
      setAst([]);
      setRegexError(err.message);
      if (debounceRef.current) clearTimeout(debounceRef.current); // No guardes si hay error
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

        {pattern.trim() === '' && recentPatterns.length > 0 && (
          <RecentPatternList
            patterns={[recentPatterns[recentPatterns.length - 1]]} // Mostrar solo la última
            onSelect={setPattern}
            onClear={() => {}}
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
