import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface Props {
  onSelect: (pattern: string) => void;
}

const suggestions = [
  { pattern: '^\\d{3}-\\d{2}-\\d{4}$', label: 'Formato de SSN' },
  { pattern: '^\\w+@\\w+\\.com$', label: 'Correo electrónico' },
  { pattern: '^\\+52\\s?\\d{10}$', label: 'Teléfono mexicano' },
  { pattern: '^[A-Z][a-z]+$', label: 'Nombre propio' },
];

export const RegexSuggestions = ({ onSelect }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sugerencias:</Text>
      {suggestions.map((s, i) => (
        <Pressable key={i} onPress={() => onSelect(s.pattern)} style={styles.item}>
          <Text style={styles.pattern}>{s.pattern}</Text>
          <Text style={styles.label}>{s.label}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  item: {
    marginBottom: 8,
  },
  pattern: {
    fontFamily: 'monospace',
    color: '#111',
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
});
