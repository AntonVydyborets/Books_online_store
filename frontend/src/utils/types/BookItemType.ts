export interface BookItem {
  id: number | string | undefined
  title: string
  price: number | undefined
  current_price?: number | undefined
  description: string
  author: string
  publisher: string
  genre: string
  cover?: string
  publication_year: number
  country_of_origin: string
  text_language: string
  rating: number
  is_available: boolean
  created_at?: string
  updated_at?: string
}

export interface BooksQueryParams {
  search?: string
  min_price?: number
  max_price?: number
  genre?: string
  author?: string
  publisher?: string
  country_of_origin?: string
  text_language?: string
  min_publication_year?: number
  max_publication_year?: number
  min_rating?: number
  max_rating?: number
  min_quantity?: string
  offset?: number // Default is 0
  limit?: number // Default is 10
}

export interface ExtendedBooksQueryParams extends Omit<BooksQueryParams, 'genre' | 'publisher' | 'available'> {
  genres?: string[]
  publishers?: string[]
  available?: string[]
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
  errors: Error[]
}
export interface ApiResponseBookId {
  data: BookItem
  meta: Record<string, unknown>
  errors: Error[]
}

export interface BookItemType {
  id: string | string | undefined
  title: string
  cover: string
  genre: string
  author?: string
  price: number
  stock: boolean
  quantity?: number
  current_price?: number
}

export interface RequiredBookItemTypeApi {
  id: string | string | undefined
  name: string
  rating: number
  author: string
  price: number
  is_available: boolean
  genre?: string
  current_price?: number
}

export interface RequiredCartItemType extends BookItem {
  quantity: number
}

export interface OptionalBookItemTypeApi {
  description?: string
  publisher?: string
  publication_year?: number
  country_of_origin?: string
  text_language?: string
}

export type BookItemTypeApi = RequiredBookItemTypeApi & OptionalBookItemTypeApi
