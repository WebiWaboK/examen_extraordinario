import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TableCell } from '../atoms/TableCell';

const rows = [
  ['Símbolo', 'Significado', 'Ejemplo'],
  ['^', 'Inicio de línea', '^Hola'],
  ['$', 'Fin de línea', 'mundo$'],
  ['.', 'Cualquier carácter', 'c.t'],
  ['\\d', 'Dígito (0-9)', '\\d{3}'],
  ['\\w', 'Carácter alfanumérico', '\\w+'],
  ['[abc]', 'Uno de a, b o c', '[aeiou]'],
  ['a|b', 'a o b', 'rojo|azul'],
  ['(abc)', 'Grupo de caracteres', '(ab)+'],
  ['\\s', 'Espacio en blanco', 'a\\sb'],
];

export const RegexHelpTable = () => (
  <View style={styles.table}>
    {rows.map((row, idx) => (
      <View key={idx} style={styles.row}>
        {row.map((cell, i) => (
          <TableCell key={i} bold={idx === 0}>{cell}</TableCell>
        ))}
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
});
