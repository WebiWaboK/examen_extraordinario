import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { InputText } from '../atoms/InputText';
import { RegexASTNode } from '../../../domain/entities/RegexASTNode';
import { InteractiveRailroad } from '../organisms/InteractiveRailroad';
import { RegexSuggestions } from '../molecules/RegexSuggestions';

interface Props {
  pattern: string;
  text: string;
  matches: string[];
  regexError: string | null;
  ast: RegexASTNode[];
  onPatternChange: (text: string) => void;
  onTextChange: (text: string) => void;
}

export const RegexEditor = ({
  pattern,
  text,
  matches,
  regexError,
  ast,
  onPatternChange,
  onTextChange,
}: Props) => {
  const hasPattern = pattern.trim().length > 0;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <InputText
          placeholder="Ej: ^\\d{3}-\\d{2}-\\d{4}$"
          value={pattern}
          onChangeText={onPatternChange}
        />

        {!hasPattern && (
          <RegexSuggestions onSelect={onPatternChange} />
        )}

        {regexError && <Text style={styles.errorText}>⚠ {regexError}</Text>}

        <InputText
          placeholder="Ej: 123-45-6789"
          value={text}
          onChangeText={onTextChange}
          multiline
        />
        {!text && (
          <Text style={styles.suggestion}>
            Escribe un texto de ejemplo para probar tu patrón.
          </Text>
        )}

        {hasPattern && (
          <>
            <Text style={styles.label}>Coincidencias:</Text>
            {matches.length > 0 ? (
              matches.map((m, i) => (
                <Text key={i} style={styles.matchText}>
                  {m}
                </Text>
              ))
            ) : (
              <Text style={styles.noMatch}>No hay coincidencias</Text>
            )}

            <Text style={styles.label}>Diagrama de Ferrocarril Interactivo:</Text>
            {ast.length > 0 ? (
              <InteractiveRailroad ast={ast} />
            ) : (
              <Text style={styles.noMatch}>AST vacío o inválido</Text>
            )}
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 16, paddingBottom: 80 },
  label: {
    marginTop: 16,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  noMatch: {
    fontStyle: 'italic',
    color: 'gray',
    marginVertical: 4,
  },
  matchText: {
    color: 'green',
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    marginVertical: 8,
    fontWeight: '600',
  },
  suggestion: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#888',
    marginVertical: 8,
  },
});
