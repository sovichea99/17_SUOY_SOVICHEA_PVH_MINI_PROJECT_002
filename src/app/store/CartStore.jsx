import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],

  addItem: (product) => {
    const incomingQty = product.quantity ?? 1;
    const existing = get().items.find((i) => i.productId === product.productId);
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.productId === product.productId
            ? { ...i, quantity: i.quantity + incomingQty }
            : i
        ),
      });
    } else {
      set({ items: [...get().items, { ...product, quantity: incomingQty }] });
    }
  },

  removeItem: (productId) =>
    set({ items: get().items.filter((i) => i.productId !== productId) }),

  updateQuantity: (productId, quantity) => {
    if (quantity < 1) return;
    set({
      items: get().items.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      ),
    });
  },

  clearCart: () => set({ items: [] }),

  get totalQuantity() {
    return get().items.reduce((sum, i) => sum + i.quantity, 0);
  },

  get subtotal() {
    return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  },
}));