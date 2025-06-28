import { useEffect, useState } from 'react';
import {
  getRecentPatterns,
  saveRecentPattern,
  clearRecentPatterns,
} from '../../data/repositories/regexPersistence';

export const useRecentPatternsViewModel = () => {
  const [recentPatterns, setRecentPatterns] = useState<string[]>([]);
  const [lastSaved, setLastSaved] = useState<string>('');

  const load = async () => {
    const data = await getRecentPatterns();
    setRecentPatterns(data);
  };

  const save = async (pattern: string) => {
    const trimmed = pattern.trim();
    if (!trimmed || trimmed === lastSaved || recentPatterns.includes(trimmed)) return;

    await saveRecentPattern(trimmed);
    setLastSaved(trimmed);
    await load();
  };

  const clear = async () => {
    await clearRecentPatterns();
    setRecentPatterns([]);
    setLastSaved('');
  };

  useEffect(() => {
    load();
  }, []);

  return {
    recentPatterns,
    save,
    clear,
    load,
  };
};
