import { create } from 'zustand'
import { persist } from 'zustand/middleware' // Import persist middleware

//@ts-ignore
import debounce from 'lodash.debounce'

import { RequiredCartItemType } from '@/utils/types/BookItemType'

export type ProductItemType = Pick<
  RequiredCartItemType,
  'id' | 'title' | 'author' | 'price' | 'cover' | 'genre' | 'quantity'
>

interface OrderState {
  order: RequiredCartItemType[]
  totalPrice: number

  setTotalPrice: (sum: number) => void
  setQuantity: (id: number, count: number) => void
  setOrderProduct: (product: ProductItemType) => void
  removeOrderProduct: (id: number) => void // Optional: To remove items
  clearOrder: () => void // Optional: To clear the cart
}

const initialState: Pick<OrderState, 'order' | 'totalPrice'> = {
  order: [],
  totalPrice: 0,
}

// Define the saveState function
const saveState = (state: Pick<OrderState, 'order' | 'totalPrice'>) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('ordersState', serializedState)
  } catch (error) {
    console.error('Failed to save state:', error)
  }
}

// Debounced version of saveState
const saveStateDebounced = debounce((state: Pick<OrderState, 'order' | 'totalPrice'>) => {
  saveState(state)
}, 500)

export const useOrdersStore = create<OrderState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setTotalPrice: (sum: number) => {
        set({ totalPrice: sum })
        saveStateDebounced({ order: get().order, totalPrice: sum })
      },

      setQuantity: (id: string | number, count: number) => {
        set((state) => {
          const updatedOrder = state.order.map((item) => (item.id === id ? { ...item, quantity: count } : item))
          // Debounced save
          saveStateDebounced({ order: updatedOrder, totalPrice: state.totalPrice })
          return { order: updatedOrder }
        })
      },

      setOrderProduct: (product: RequiredCartItemType) => {
        set((state) => {
          const updatedOrder = [...state.order, product]
          // Debounced save
          saveStateDebounced({ order: updatedOrder, totalPrice: state.totalPrice })
          return { order: updatedOrder }
        })
      },

      removeOrderProduct: (id: string | number) => {
        set((state) => {
          const updatedOrder = state.order.filter((item) => item.id !== id)
          // Debounced save
          saveStateDebounced({ order: updatedOrder, totalPrice: state.totalPrice })
          return { order: updatedOrder }
        })
      },

      clearOrder: () => {
        set(initialState)
        saveStateDebounced(initialState)
      },
    }),
    {
      name: 'orders-storage',
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
      onRehydrateStorage: () => (state) => {
        if (state) {
          console.log('State rehydrated:', state)
        }
      },
    }
  )
)
