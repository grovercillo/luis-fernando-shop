import { create } from 'zustand'

export type CartItem = {
  id: string
  name: string
  brand: string
  price_cents: number
  quantity: number
  image?: string
}

type CartStore = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item) => set(state => {
    const existing = state.items.find(i => i.id === item.id)
    if (existing) {
      return {
        items: state.items.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
    }
    return { items: [...state.items, item] }
  }),

  removeItem: (id) => set(state => ({
    items: state.items.filter(i => i.id !== id)
  })),

  updateQuantity: (id, quantity) => set(state => ({
    items: quantity <= 0
      ? state.items.filter(i => i.id !== id)
      : state.items.map(i => i.id === id ? { ...i, quantity } : i)
  })),

  clearCart: () => set({ items: [] }),

  total: () => get().items.reduce(
    (sum, item) => sum + item.price_cents * item.quantity, 0
  ),
}))