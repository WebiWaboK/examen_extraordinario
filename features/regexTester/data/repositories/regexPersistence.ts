import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'recent_patterns';
const MAX_PATTERNS = 10;

export const getRecentPatterns = async (): Promise<string[]> => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveRecentPattern = async (pattern: string): Promise<void> => {
  const existing = await getRecentPatterns();
  const updated = [pattern, ...existing.filter(p => p !== pattern)].slice(0, MAX_PATTERNS);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const clearRecentPatterns = async (): Promise<void> => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};
