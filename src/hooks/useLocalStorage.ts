import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>];
export function useLocalStorage<T>(key: string): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>];
export function useLocalStorage<T>(key: string, defaultValue?: T): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)!) as T ?? defaultValue;
    }
    catch (_) {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value == undefined) {
      localStorage.removeItem(key);
    }
    else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  return [value, setValue];
}