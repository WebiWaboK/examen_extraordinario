import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RegexHelpTable } from '../components/molecules/RegexHelpTable';

export default function RegexManualScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Manual de Expresiones Regulares</Text>
      <Text style={styles.subtitle}>
        A continuación se presentan los símbolos más comunes y su significado:
      </Text>
      <RegexHelpTable />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
    color: '#444',
  },
});
