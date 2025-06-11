import { View, SafeAreaView } from 'react-native';
import { RegexEditor } from '../components/organisms/RegexEditor';
import { useRegexEditorViewModel } from '../viewmodels/useRegexEditorViewModel';

export default function RegexEditorScreen() {
  const {
    pattern,
    text,
    matches,
    handlePatternChange,
    handleTextChange,
  } = useRegexEditorViewModel();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <RegexEditor
          pattern={pattern}
          text={text}
          matches={matches}
          onPatternChange={handlePatternChange}
          onTextChange={handleTextChange}
        />
      </View>
    </SafeAreaView>
  );
}
