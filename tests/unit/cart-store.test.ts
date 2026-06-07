import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '@/lib/cart-store'

const mockProduct = {
  id: 'test-id-1',
  name: 'Pack Trío AOVE',
  brand: 'Regere Emporium',
  price_cents: 3000,
  quantity: 1,
  image: undefined,
}

describe('Cart Store', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  it('empieza vacío', () => {
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('añade un producto', () => {
    useCartStore.getState().addItem(mockProduct)
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0].name).toBe('Pack Trío AOVE')
  })

  it('incrementa cantidad si el producto ya existe', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().addItem(mockProduct)
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0].quantity).toBe(2)
  })

  it('elimina un producto', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().removeItem('test-id-1')
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('actualiza la cantidad', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().updateQuantity('test-id-1', 5)
    const { items } = useCartStore.getState()
    expect(items[0].quantity).toBe(5)
  })

  it('elimina el producto si la cantidad es 0', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().updateQuantity('test-id-1', 0)
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('calcula el total correctamente', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().addItem({
      id: 'test-id-2',
      name: 'Aceitunas Lanzas',
      brand: 'Lanzas',
      price_cents: 600,
      quantity: 1,
    })
    const total = useCartStore.getState().total()
    expect(total).toBe(3600)
  })

  it('vacía el carrito', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().clearCart()
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('total es 0 con carrito vacío', () => {
    const total = useCartStore.getState().total()
    expect(total).toBe(0)
  })

  it('total con múltiples unidades', () => {
    useCartStore.getState().addItem({ ...mockProduct, quantity: 1 })
    useCartStore.getState().updateQuantity('test-id-1', 3)
    const total = useCartStore.getState().total()
    expect(total).toBe(9000)
  })
})