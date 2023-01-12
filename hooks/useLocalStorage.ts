import { useEffect, useState } from 'react';
import type { Product } from '@prisma/client';

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
  const [cart, { updateItem }] = useLocalStorage<Cart>(
    'cart',
    JSON.stringify([]),
  );

  function updateProductQuantity(id: Product['id'], value: 1 | -1) {
    updateItem((cart) =>
      cart.map((c) => {
        if (c.id !== id) return c;

        return { ...c, quantity: c.quantity + value || 1 };
      }),
    );
  }

  function removeProduct(id: Product['id']) {
    updateItem((cart) => cart.filter((c) => c.id !== id));
  }

  function addProduct(product: Product) {
    updateItem((cart) => cart.concat({ ...product, quantity: 1 }));
  }

  return [
    cart,
    {
      updateProductQuantity,
      removeProduct,
      addProduct,
    },
  ] as const;
}
