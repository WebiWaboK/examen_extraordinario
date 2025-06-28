import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
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
      {recentPatterns.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Historial vacío</Text>
        </View>
      ) : (
        <RecentPatternList
          patterns={recentPatterns}
          onSelect={handleSelect}
          onClear={handleClear}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#888', fontStyle: 'italic' },
});
