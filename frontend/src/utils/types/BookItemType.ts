export interface BookItemType {
  id: string
  title: string
  cover: string
  genre: string
  price: number
  stock: boolean
}

export interface RequiredBookItemTypeApi {
  id: string
  name: string
  genre: string
  price: number
  is_available: boolean
}

export interface OptionalBookItemTypeApi {
  description?: string
  author?: string
  publisher?: string
  publication_year?: number
  country_of_origin?: string
  text_language?: string
  rating?: number
}

export type BookItemTypeApi = RequiredBookItemTypeApi & OptionalBookItemTypeApi
