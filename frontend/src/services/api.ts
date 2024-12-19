import axios, { AxiosResponse } from 'axios'

import { BookItemTypeApi } from '@/utils/types/BookItemType'

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchBooks = async () => {
  try {
    const res: AxiosResponse<BookItemTypeApi[]> = await instance.get('/books', {
      params: {
        limit: 12, // Set a high limit to fetch all books
      },
    })
    return res.data
  } catch (error) {
    console.error('Error fetching books:', error)
    throw error
  }
}
