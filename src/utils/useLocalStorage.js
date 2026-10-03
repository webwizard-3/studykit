import { useEffect, useRef, useState } from "react";

/**
 * Drop-in replacement for useState that persists to localStorage.
 * Reads lazily (only on mount) and writes on every change.
 * Falls back gracefully (in-memory only) if localStorage is unavailable
 * (private browsing, disabled storage, etc.) instead of throwing.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const isFirstRun = useRef(true);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or unavailable — the tool still works for this session.
    }
  }, [key, value]);

  // Avoid writing back the initial value before the consumer changes anything
  useEffect(() => {
    isFirstRun.current = false;
  }, []);

  return [value, setValue];
}
