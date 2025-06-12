import { View, Text, StyleSheet } from 'react-native';
import { InputText } from '../atoms/InputText';
import { RegexASTNode } from '../../../domain/entities/RegexASTNode';
import React, { JSX } from 'react';

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
  function renderAST(nodes: RegexASTNode[], level = 0): JSX.Element[] {
    return nodes.map((node, i) => {
      const indent = ' '.repeat(level * 2);
      switch (node.type) {
        case 'literal':
          return <Text key={i}>{indent}- literal: {node.value}</Text>;
        case 'anchor':
          return <Text key={i}>{indent}- anchor: {node.kind}</Text>;
        case 'quantifier':
          return (
            <View key={i}>
              <Text>{indent}- quantifier: {node.min} to {node.max}</Text>
              {renderAST([node.child], level + 1)}
            </View>
          );
        case 'group':
          return (
            <View key={i}>
              <Text>{indent}- group:</Text>
              {renderAST(node.children, level + 1)}
            </View>
          );
        case 'alternation':
          return (
            <View key={i}>
              <Text>{indent}- alternation:</Text>
              {node.options.map((opt, j) => (
                <View key={j}>
                  <Text>{indent}  option {j + 1}:</Text>
                  {renderAST(opt, level + 2)}
                </View>
              ))}
            </View>
          );
        default:
          return <Text key={i}>{indent}- tipo desconocido</Text>;
      }
    });
  }

  return (
    <View style={styles.container}>
      <InputText
        placeholder="Expresión regular"
        value={pattern}
        onChangeText={onPatternChange}
      />
      {regexError && <Text style={styles.errorText}>{regexError}</Text>}

      <InputText
        placeholder="Texto a evaluar"
        value={text}
        onChangeText={onTextChange}
        multiline
      />

      <Text style={styles.label}>Coincidencias:</Text>
      {Array.isArray(matches) && matches.length > 0 ? (
        matches.map((m, i) => <Text key={i}>{m}</Text>)
      ) : (
        <Text style={styles.noMatch}>No hay coincidencias</Text>
      )}

      <Text style={styles.label}>Árbol de sintaxis abstracta (AST):</Text>
      {Array.isArray(ast) && ast.length > 0 ? (
        renderAST(ast)
      ) : (
        <Text style={styles.noMatch}>AST vacío</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { marginTop: 10, fontWeight: 'bold' },
  noMatch: { fontStyle: 'italic', color: 'gray' },
  errorText: { color: 'red', marginBottom: 8 },
});
