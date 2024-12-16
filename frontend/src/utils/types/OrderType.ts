import { BookItemType } from './BookItemType'

export interface orderItem {
  id: string
  quantity: number
  book: BookItemType
  createdAt: string
  updatedAt: string
}

export interface OrderType {
  id: string
  orderItems: orderItem[]
  status: 'pending' | 'completed' | 'cancelled'
  totalPrice: string
  createdAt: string
  updatedAt: string
}