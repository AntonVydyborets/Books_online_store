import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import { OrderType, Status } from '@/utils/types/OrderType'

interface OrderState {
  orders: OrderType
  setTotalPrice: (sum: number) => void
  setQuantity: (id: string | number) => void
  countTotalPrice: () => void
}

const initialState = {
  id: uuid(),
  orderItems: [
    {
      id: uuid(),
      quantity: 1,
      book: {
        id: uuid(),
        title: 'За Перекопом є земля 2',
        cover: 'https://laboratory.ua/files/products/za-perekopom-ye-zemlia-1000-2.270x435.jpg',
        author: 'Євстахій Загачевський',
        price: 400,
      },
      createdAt: '2024-11-16T10:04:48.224Z',
      updatedAt: '2024-11-16T10:24:41.308Z',
    },
    {
      id: '123123',
      quantity: 1,
      book: {
        id: '1222222',
        title: 'Закохані в життя, одружені на смерті 1',
        cover: 'https://propalahramota.com/storage/product/md/JLKTdDv9R8m6BXjjMUmVQ8IaR70zC75GoY2g4vm7.jpeg',
        author: 'Євстахій Загачевський',
        price: 150,
      },
      createdAt: '2024-12-16T10:04:48.224Z',
      updatedAt: '2024-12-16T10:24:41.308Z',
    },
  ],
  status: Status.pending,
  totalPrice: null,
  createdAt: '2024-22-16T10:04:48.224Z',
  updatedAt: '2024-22-16T10:24:41.308Z',
}

export const useOrdersStore = create<OrderState>((set) => ({
  orders: initialState,

  setTotalPrice: (sum: number) => {
    // set((state: OrderState) => ({ ...state, orders: { ...state.orders, totalPrice: sum } }))
  },

  setQuantity: (id: string | number) => {
    // set((state: OrderState) => ({...state, }))
  },
}))
