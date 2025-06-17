import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { RegexEditor } from '../components/organisms/RegexEditor';
import { useRegexEditorViewModel } from '../viewmodels/useRegexEditorViewModel';

export default function RegexEditorScreen() {
  const {
    pattern,
    text,
    matches,
    regexError,
    ast,
    handlePatternChange,
    handleTextChange,
  } = useRegexEditorViewModel();

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
