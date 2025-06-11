import { View, Text, StyleSheet } from 'react-native';
import { InputText } from '../atoms/InputText';

interface Props {
  pattern: string;
  text: string;
  matches: string[];
  onPatternChange: (text: string) => void;
  onTextChange: (text: string) => void;
}

export const RegexEditor = ({
  pattern,
  text,
  matches,
  onPatternChange,
  onTextChange,
}: Props) => {
  return (
    <View style={styles.container}>
      <InputText
        placeholder="Expresión regular"
        value={pattern}
        onChangeText={onPatternChange}
      />
      <InputText
        placeholder="Texto a evaluar"
        value={text}
        onChangeText={onTextChange}
        multiline
      />
      <Text style={styles.label}>Coincidencias:</Text>
      {matches.length > 0 ? (
        matches.map((m, i) => <Text key={i}>{m}</Text>)
      ) : (
        <Text style={styles.noMatch}>No hay coincidencias</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { marginTop: 10, fontWeight: 'bold' },
  noMatch: { fontStyle: 'italic', color: 'gray' },
});
