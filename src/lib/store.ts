"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  key: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  colour: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  zone: string;
  drawerOpen: boolean;
  add: (item: Omit<CartItem, "key" | "quantity">, quantity?: number) => void;
  remove: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  setZone: (zone: string) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      zone: "nairobi-suburbs",
      drawerOpen: false,
      add: (item, quantity = 1) =>
        set((state) => {
          const key = `${item.slug}::${item.colour}`;
          const existing = state.items.find((line) => line.key === key);
          const items = existing
            ? state.items.map((line) =>
                line.key === key
                  ? { ...line, quantity: Math.min(10, line.quantity + quantity) }
                  : line,
              )
            : [...state.items, { ...item, key, quantity }];
          return { items, drawerOpen: true };
        }),
      remove: (key) =>
        set((state) => ({ items: state.items.filter((line) => line.key !== key) })),
      setQuantity: (key, quantity) =>
        set((state) => ({
          items: state.items.map((line) =>
            line.key === key
              ? { ...line, quantity: Math.max(1, Math.min(10, quantity)) }
              : line,
          ),
        })),
      clear: () => set({ items: [] }),
      setZone: (zone) => set({ zone }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
    }),
    {
      name: "joseph_decor_cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, zone: state.zone }),
      skipHydration: true,
    },
  ),
);

type WishlistState = {
  slugs: string[];
  toggle: (slug: string) => boolean;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  has: (slug: string) => boolean;
  clear: () => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      slugs: [],
      toggle: (slug) => {
        const exists = get().slugs.includes(slug);
        set((state) => ({
          slugs: exists
            ? state.slugs.filter((item) => item !== slug)
            : [...state.slugs, slug],
        }));
        return !exists;
      },
      add: (slug) =>
        set((state) =>
          state.slugs.includes(slug) ? state : { slugs: [...state.slugs, slug] },
        ),
      remove: (slug) =>
        set((state) => ({ slugs: state.slugs.filter((item) => item !== slug) })),
      has: (slug) => get().slugs.includes(slug),
      clear: () => set({ slugs: [] }),
    }),
    {
      name: "joseph_decor_wishlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ slugs: state.slugs }),
      skipHydration: true,
    },
  ),
);

export type Toast = { id: number; message: string; tone: "success" | "info" };

type ToastState = {
  toasts: Toast[];
  push: (message: string, tone?: Toast["tone"]) => void;
  dismiss: (id: number) => void;
};

export const useToasts = create<ToastState>((set) => ({
  toasts: [],
  push: (message, tone = "success") => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    set((state) => ({ toasts: [...state.toasts, { id, message, tone }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }));
    }, 3800);
  },
  dismiss: (id) =>
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}));

export function cartTotals(items: CartItem[]) {
  const count = items.reduce((total, line) => total + line.quantity, 0);
  const subtotal = items.reduce((total, line) => total + line.price * line.quantity, 0);
  return { count, subtotal };
}
