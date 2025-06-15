import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
  color: string;
  onPress: () => void;
}

export const RegexNodeBox = ({ label, color, onPress }: Props) => (
  <Pressable onPress={onPress} style={[styles.box, { backgroundColor: color }]}>
    <Text style={styles.text}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  box: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 6,
    elevation: 2,
  },
  text: {
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});
