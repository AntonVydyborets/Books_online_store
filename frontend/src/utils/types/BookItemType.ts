export interface BookItem {
  id: number
  title: string
  price: number
  description: string
  author: string
  publisher: string
  genre: string
  publication_year: number
  country_of_origin: string
  text_language: string
  rating: number
  is_available: boolean
  created_at: string
  updated_at: string
}

interface Pagination {
  offset: number
  limit: number
  total: number
}

export interface ApiData {
  items: BookItem[]
  pagination: Pagination
}

export interface ApiResponse {
  data: ApiData
  meta: Record<string, unknown>
  errors: any[]
}

export interface BookItemType {
  id: string
  title: string
  cover: string
  genre: string
  author?: string
  price: number
  stock: boolean
  quantity?: number
}

export interface RequiredBookItemTypeApi {
  id: string
  name: string
  rating: number
  author: string
  price: number
  is_available: boolean
  genre?: string
}

export interface OptionalBookItemTypeApi {
  description?: string
  publisher?: string
  publication_year?: number
  country_of_origin?: string
  text_language?: string
}

export type BookItemTypeApi = RequiredBookItemTypeApi & OptionalBookItemTypeApi
