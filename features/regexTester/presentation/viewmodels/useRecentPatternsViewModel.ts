import { useEffect, useState, useRef } from 'react';
import {
  getRecentPatterns,
  saveRecentPattern,
  clearRecentPatterns,
} from '../../data/repositories/regexPersistence';

export const useRecentPatternsViewModel = () => {
  const [recentPatterns, setRecentPatterns] = useState<string[]>([]);
  const timeoutRef = useRef<any>(null);
  const lastPatternRef = useRef<string>('');

  const load = async () => {
    const data = await getRecentPatterns();
    setRecentPatterns(data);
  };

  const save = (pattern: string) => {
    const trimmed = pattern.trim();
    if (!trimmed || trimmed === lastPatternRef.current) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        await saveRecentPattern(trimmed);
        lastPatternRef.current = trimmed;
        await load();
      } catch (e) {
        console.error("Error saving pattern:", e);
      }
    }, 5000);
  };

  const clear = async () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    await clearRecentPatterns();
    setRecentPatterns([]);
    lastPatternRef.current = '';
  };

  useEffect(() => {
    load();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    recentPatterns,
    save,
    clear,
  };
};
