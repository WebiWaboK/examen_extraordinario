import React from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useRecentPatternsViewModel } from '../viewmodels/useRecentPatternsViewModel';
import { RecentPatternList } from '../components/molecules/RecentPatternList';

export default function RecentRegexScreen() {
  const { recentPatterns, clear } = useRecentPatternsViewModel();
  const router = useRouter();

  const handleSelect = (pattern: string) => {
    router.push({ pathname: '/', params: { selected: pattern } });
  };

  const handleClear = () => {
    Alert.alert('¿Borrar todo?', 'Esta acción eliminará las expresiones recientes.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: clear },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <RecentPatternList
        patterns={recentPatterns}
        onSelect={handleSelect}
        onClear={handleClear}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
