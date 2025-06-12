import { View, Text, StyleSheet } from 'react-native';
import { RegexASTNode } from '../../../domain/entities/RegexASTNode';

interface Props {
  ast: RegexASTNode[];
}

export const RegexASTViewer = ({ ast }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Árbol de Sintaxis:</Text>
      {ast.map((node, index) => (
        <Text key={index} style={styles.node}>{JSON.stringify(node)}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  title: { fontWeight: 'bold', marginBottom: 8 },
  node: { fontFamily: 'monospace', marginBottom: 4 },
});
