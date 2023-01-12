import { useEffect, useState } from 'react';

import type { Cart } from '@types';

export function useLocalStorage<T>(key: string, initialValue: string) {
  const [storageValue, setStorageValue] = useState<T>(JSON.parse(initialValue));

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);

      if (item) {
        const parsed: T = JSON.parse(item);
        setStorageValue(parsed);
      } else {
        localStorage.setItem(key, initialValue);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }, [key, initialValue]);

  function updateItem(value: T | ((value: typeof storageValue) => T)) {
    try {
      const valueToSet =
        value instanceof Function ? value(storageValue) : value;

      localStorage.setItem(key, JSON.stringify(valueToSet));
      setStorageValue(valueToSet);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }

  return [storageValue, { updateItem }] as const;
}

export function useCart() {
  return useLocalStorage<Cart>('cart', JSON.stringify([]));
}
