"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";

export type CartLine = { productId: string; quantity: number };
export type CustomerProfile = { name: string; email: string; phone: string; address: string; city: string; postalCode: string };

type StoreContextValue = {
  cart: CartLine[];
  cartCount: number;
  profile: CustomerProfile | null;
  addToCart: (product: Product, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  saveProfile: (profile: CustomerProfile) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);
const CART_KEY = "commercepilot.store.cart.v1";
const PROFILE_KEY = "commercepilot.store.profile.v1";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem(CART_KEY);
      const savedProfile = window.localStorage.getItem(PROFILE_KEY);
      if (savedCart) {
        const parsed: unknown = JSON.parse(savedCart);
        if (Array.isArray(parsed)) setCart(parsed.filter((line): line is CartLine => Boolean(line) && typeof line.productId === "string" && Number.isInteger(line.quantity) && line.quantity > 0));
      }
      if (savedProfile) {
        const parsed: unknown = JSON.parse(savedProfile);
        if (parsed && typeof parsed === "object" && "email" in parsed && typeof parsed.email === "string") setProfile(parsed as CustomerProfile);
      }
    } catch {
      window.localStorage.removeItem(CART_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    if (product.stock < 1) return;
    const amount = Math.max(1, Math.min(Math.floor(quantity), product.stock));
    setCart((current) => {
      const existing = current.find((line) => line.productId === product.id);
      if (!existing) return [...current, { productId: product.id, quantity: amount }];
      return current.map((line) => line.productId === product.id ? { ...line, quantity: Math.min(product.stock, line.quantity + amount) } : line);
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      setCart((current) => current.filter((line) => line.productId !== productId));
      return;
    }
    setCart((current) => current.map((line) => line.productId === productId ? { ...line, quantity: Math.floor(quantity) } : line));
  }, []);

  const removeFromCart = useCallback((productId: string) => setCart((current) => current.filter((line) => line.productId !== productId)), []);
  const clearCart = useCallback(() => setCart([]), []);
  const saveProfile = useCallback((nextProfile: CustomerProfile) => {
    setProfile(nextProfile);
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(nextProfile));
  }, []);

  const value = useMemo(() => ({
    cart,
    cartCount: cart.reduce((sum, line) => sum + line.quantity, 0),
    profile,
    addToCart,
    setQuantity,
    removeFromCart,
    clearCart,
    saveProfile,
  }), [cart, profile, addToCart, setQuantity, removeFromCart, clearCart, saveProfile]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStorefront() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStorefront harus digunakan di dalam StoreProvider");
  return context;
}
