import { useState } from 'react';

export const useLocalStorage = (keyName: string, defaultValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    const value = window.localStorage.getItem(keyName);
    if (value !== '') {
      return String(value);
    } else {
      window.localStorage.setItem(keyName, defaultValue);
      return defaultValue;
    }
  });

  const setValue = (newValue: string) => {
    window.localStorage.setItem(keyName, newValue);
    setStoredValue(newValue);
    return;
  };

  return [storedValue, setValue];
};
