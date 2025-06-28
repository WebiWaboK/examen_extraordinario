import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'recent_regex_patterns';

export const getRecentPatterns = async (): Promise<string[]> => {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveRecentPattern = async (pattern: string): Promise<void> => {
  const current = await getRecentPatterns();
  const updated = [pattern, ...current.filter(p => p !== pattern)].slice(0, 20);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const clearRecentPatterns = async (): Promise<void> => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};
