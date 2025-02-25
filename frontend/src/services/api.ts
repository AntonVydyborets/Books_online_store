import { QueryFunctionContext } from '@tanstack/react-query'

import axios, { AxiosResponse } from 'axios'

import { ApiResponse, ApiResponseBookId, BooksQueryParams } from '@/utils/types/BookItemType'
import { Order } from '@/utils/types/order/orderTypes'

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

export const fetchBookById = async (id: string | undefined): Promise<ApiResponseBookId> => {
  try {
    const res: AxiosResponse<ApiResponseBookId> = await instance.get(`/books/${id}`)

    return res.data
  } catch (error) {
    console.error(`Error fetching book with ${id}:`, error)
    throw error
  }
}

export const fetchBookImageById = async (id: string | undefined): Promise<Blob> => {
  try {
    const res: AxiosResponse<Blob> = await instance.get(`/books/${id}/image`, {
      responseType: 'blob',
    })
    return res.data
  } catch (error) {
    console.error(`Error fetching book image with ${id}:`, error)
    throw error
  }
}
export const setOrderInformation = async (order: Order): Promise<Order> => {
  try {
    const res = await instance.post('/orders', order)

    return res.data
  } catch (error) {
    console.error('Error setting order:', error)
    throw error
  }
}
