import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartReducer, initialState, CART_STORAGE_KEY } from './cartUtils';
import type { CartState, CartAction } from './cartUtils';

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (init) => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? { items: JSON.parse(stored) } : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
} 