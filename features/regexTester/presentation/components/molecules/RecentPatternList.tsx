import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface Props {
  patterns: string[];
  onSelect: (p: string) => void;
  onClear: () => void;
}

export const RecentPatternList = ({ patterns, onSelect, onClear }: Props) => (
  <View style={styles.container}>
    <Text style={styles.title}>Recientes</Text>
    {patterns.map((p, i) => (
      <Pressable key={i} onPress={() => onSelect(p)}>
        <Text style={styles.item}>{p}</Text>
      </Pressable>
    ))}
    {patterns.length > 0 && (
      <Pressable onPress={onClear}>
        <Text style={styles.clear}>Limpiar todo</Text>
      </Pressable>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold' },
  item: { color: '#007bff', marginVertical: 6 },
  clear: { color: 'red', marginTop: 12, fontSize: 14 },
});
