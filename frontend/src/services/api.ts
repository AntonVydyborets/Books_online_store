import { QueryFunctionContext } from '@tanstack/react-query'

import axios, { AxiosResponse } from 'axios'

import { ApiResponse } from '@/utils/types/BookItemType'

interface BooksQueryParams {
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
  offset?: number // Default is 0
  limit?: number // Default is 10
}

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchBooks = async ({
  queryKey,
}: QueryFunctionContext<[string, BooksQueryParams]>): Promise<ApiResponse> => {
  const [, params] = queryKey

  try {
    const res: AxiosResponse<ApiResponse> = await instance.get('/books', { params })
    return res.data
  } catch (error) {
    console.error('Error fetching books:', error)
    throw error
  }
}
