import React, { useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useRecentPatternsViewModel } from '../viewmodels/useRecentPatternsViewModel';
import { RecentPatternList } from '../components/molecules/RecentPatternList';

export default function RecentRegexScreen() {
  const { recentPatterns, load } = useRecentPatternsViewModel();
  const router = useRouter();

  const handleSelect = (pattern: string) => {
    router.push({ pathname: '/', params: { selected: pattern } });
  };

  // ✅ Cada vez que la pantalla gana foco, recarga el historial
  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      {recentPatterns.length > 0 ? (
        <RecentPatternList
          patterns={recentPatterns}
          onSelect={handleSelect}
          onClear={() => {}}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Historial vacío</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#888', fontStyle: 'italic' },
});
