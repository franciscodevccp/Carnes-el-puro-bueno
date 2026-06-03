"use client";

// Carrito = estado de cliente (sin backend, sin persistencia). Ver docs/conventions.md.
// Maneja: agregar, quitar, cambiar cantidad, subtotal en vivo, y el estado abierto del drawer.

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  /** Suma de cantidades (para el badge del navbar). */
  count: number;
  /** Subtotal en CLP. */
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  increment: (slug: string) => void;
  decrement: (slug: string) => void;
  clear: () => void;
  /** Estado del drawer (CartSheet), global desde cualquier página. */
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  function addItem(product: Product, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.slug === product.slug);
      if (existing) {
        return prev.map((i) =>
          i.product.slug === product.slug
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
  }

  function removeItem(slug: string) {
    setItems((prev) => prev.filter((i) => i.product.slug !== slug));
  }

  function setQuantity(slug: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(slug);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.slug === slug ? { ...i, quantity } : i))
    );
  }

  function increment(slug: string) {
    setItems((prev) =>
      prev.map((i) =>
        i.product.slug === slug ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  }

  function decrement(slug: string) {
    setItems((prev) =>
      prev.flatMap((i) => {
        if (i.product.slug !== slug) return [i];
        const next = i.quantity - 1;
        return next <= 0 ? [] : [{ ...i, quantity: next }];
      })
    );
  }

  const clear = () => setItems([]);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    addItem,
    removeItem,
    setQuantity,
    increment,
    decrement,
    clear,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    setOpen: setIsOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de <CartProvider>.");
  }
  return ctx;
}
