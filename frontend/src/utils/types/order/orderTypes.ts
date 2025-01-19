export interface OrderItem {
  id?: number
  order_id?: number
  book_id: number
  quantity: number
}

// Represents an individual order
export interface Order {
  id?: number
  total_price: number
  status: string
  email: string
  phone: string
  items: OrderItem[]
  created_at?: string
  updated_at?: string
}

// Represents pagination details
export interface Pagination {
  offset: number
  limit: number
  total: number
}

// Represents the data section of the API response
export interface OrderData {
  items: Order[]
  pagination: Pagination
}

// Represents the complete API response
export interface OrderApiResponse {
  data: OrderData
  meta: Record<string, any>
  errors: string[]
}
