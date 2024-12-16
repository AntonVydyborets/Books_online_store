import { BookItemType } from './BookItemType'

export interface OrderItem {
  id: string
  quantity: number
  book: BookItemType
  createdAt: string
  updatedAt: string
}

export enum Status {
  pending = "pending",
  completed = "completed",
  cancelled = "cancelled",
}

export interface OrderType {
  id: string
  orderItems: OrderItem[]
  status: Status
  totalPrice: string
  createdAt: string
  updatedAt: string
}