import { SafeAreaView } from 'react-native';
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
    <SafeAreaView style={{ flex: 1 }}>
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
