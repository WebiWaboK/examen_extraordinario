import { View, SafeAreaView } from 'react-native';
import { RegexEditor } from '../components/organisms/RegexEditor';
import { useRegexEditorViewModel } from '../viewmodels/useRegexEditorViewModel';

export default function RegexEditorScreen() {
  const {
    pattern,
    text,
    matches,
    regexError,
    ast, // ✅ Asegúrate de traer esto del ViewModel
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
          regexError={regexError}
          ast={ast} // ✅ Lo pasamos aquí al componente
          onPatternChange={handlePatternChange}
          onTextChange={handleTextChange}
        />
      </View>
    </SafeAreaView>
  );
}
