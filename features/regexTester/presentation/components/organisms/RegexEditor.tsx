import React, { JSX } from 'react';
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
  const renderAST = (nodes: RegexASTNode[], level = 0): JSX.Element[] => {
    return nodes
      .map((node, i) => {
        const indent = ' '.repeat(level * 2);
        switch (node.type) {
          case 'literal':
            return (
              <Text key={i} style={styles.astText}>
                {indent}- literal: {node.value}
              </Text>
            );
          case 'anchor':
            return (
              <Text key={i} style={styles.astText}>
                {indent}- anchor: {node.kind}
              </Text>
            );
          case 'quantifier':
            return (
              <View key={i} style={styles.astGroup}>
                <Text style={styles.astText}>
                  {indent}- quantifier: {node.min} to {node.max ?? '∞'}
                </Text>
                {renderAST([node.child], level + 1)}
              </View>
            );
          case 'group':
            return (
              <View key={i} style={styles.astGroup}>
                <Text style={styles.astText}>{indent}- group:</Text>
                {renderAST(node.children, level + 1)}
              </View>
            );
          case 'alternation':
            return (
              <View key={i} style={styles.astGroup}>
                <Text style={styles.astText}>{indent}- alternation:</Text>
                {node.options.map((opt, j) => (
                  <View key={j} style={styles.astSubGroup}>
                    <Text style={styles.astText}>
                      {indent}  option {j + 1}:
                    </Text>
                    {renderAST(opt, level + 2)}
                  </View>
                ))}
              </View>
            );
          default:
            return null;
        }
      })
      .filter((el): el is JSX.Element => el !== null && el !== undefined);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <InputText
          placeholder="Expresión regular"
          value={pattern}
          onChangeText={onPatternChange}
        />
        {regexError && <Text style={styles.errorText}>⚠ {regexError}</Text>}

        <InputText
          placeholder="Texto a evaluar"
          value={text}
          onChangeText={onTextChange}
          multiline
        />

        <Text style={styles.label}>Coincidencias:</Text>
        {Array.isArray(matches) && matches.length > 0 ? (
          matches.map((m, i) => (
            <Text key={i} style={styles.matchText}>
              {m}
            </Text>
          ))
        ) : (
          <Text style={styles.noMatch}>No hay coincidencias</Text>
        )}

        <Text style={styles.label}>Árbol de sintaxis abstracta (AST):</Text>
        {Array.isArray(ast) && ast.length > 0 ? (
          renderAST(ast)
        ) : (
          <Text style={styles.noMatch}>AST vacío</Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 80,
  },
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
  astText: {
    fontFamily: 'monospace',
    fontSize: 14,
    marginLeft: 8,
    color: '#444',
  },
  astGroup: {
    marginTop: 4,
    marginBottom: 4,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#ccc',
  },
  astSubGroup: {
    paddingLeft: 8,
    marginTop: 2,
  },
});
