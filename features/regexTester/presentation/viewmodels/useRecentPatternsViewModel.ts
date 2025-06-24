import { useEffect, useState, useRef } from 'react';
import {
  getRecentPatterns,
  saveRecentPattern,
  clearRecentPatterns,
} from '../../data/repositories/regexPersistence';

export const useRecentPatternsViewModel = () => {
  const [recentPatterns, setRecentPatterns] = useState<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string>('');

  const load = async () => {
    const data = await getRecentPatterns();
    setRecentPatterns(data);
  };

  const save = async (pattern: string) => {
    if (pattern.trim() === '' || pattern === lastSavedRef.current) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(async () => {
      await saveRecentPattern(pattern);
      lastSavedRef.current = pattern;
      await load();
    }, 5000); // ⏱️ Espera de 5 segundos sin cambios antes de guardar
  };

  const clear = async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    await clearRecentPatterns();
    setRecentPatterns([]);
    lastSavedRef.current = '';
  };

  useEffect(() => {
    load();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return {
    recentPatterns,
    save,
    clear,
  };
};
