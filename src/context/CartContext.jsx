import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getAccessToken } from '../lib/authToken';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const CartContext = createContext({ cartCount: 0, refreshCart: () => {} });

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = useCallback(async () => {
    const token = getAccessToken();
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await fetch(`${API_BASE_URL}/api/orders/cart/`, {
        headers,
        credentials: 'include',
      });
      if (!res.ok) { setCartCount(0); return; }
      const data = await res.json();
      const items = Array.isArray(data) ? data : (data.items ?? []);
      const total = items.reduce((s, item) => s + (item.quantity ?? 1), 0);
      setCartCount(total);
    } catch {
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
