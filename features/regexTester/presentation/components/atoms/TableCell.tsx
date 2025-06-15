import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  children: string;
  flex?: number;
  bold?: boolean;
}

export const TableCell = ({ children, flex = 1, bold = false }: Props) => (
  <View style={[styles.cell, { flex }]}>
    <Text style={[styles.text, bold && styles.bold]}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  cell: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold',
  },
});
