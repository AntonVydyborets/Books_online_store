import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

import { BookItemType, BookItemTypeApi } from '@/utils/types/BookItemType'
import { OrderType, Status } from '@/utils/types/OrderType'
import { BlogItemType } from '@/utils/types/BlogItemType'

interface StoreState {
  allProducts: BookItemTypeApi[]
  newBooks: BookItemType[]
  saleBooks: BookItemType[]
  blogs: BlogItemType[]
  orders: OrderType

  setAllProducts: (products: BookItemTypeApi[]) => void
}

const initialState = {
  allProducts: [],
  newBooks: [
    {
      id: uuid(),
      title: 'За Перекопом є земля 5',
      cover: 'https://laboratory.ua/files/products/za-perekопом-ye-земля-1000-2.1800x1200w.jpg',
      genre: 'Fiction',
      price: 370,
      stock: true,
    },
  ],
  sale: [
    {
      id: uuid(),
      title: 'Закохані в життя, одружені на смерті 1',
      cover: 'https://propalahramota.com/storage/product/md/JLKTdDv9R8m6BXjjMUmVQ8IaR70zC75GoY2g4vm7.jpeg',
      genre: 'Fiction, Mystery',
      price: 150,
      stock: true,
    },
  ],
  blogs: [
    {
      id: 1,
      title: '1 Який рівень англійської потрібен для UX/UI дизайнерів',
      cover: 'https://nashformat.ua/files/slides_resized/2024_11_01_novynka_vid_timoti_snaydera_470h320.640x360.jpg',
      desc: 'Англійська мова в сучасному світі - це перепустка до високооплачуваної роботи. Lorem ipsum dolor sit.',
      date: '14.05.2023',
    },
    {
      id: 2,
      title: '2 Який рівень англійської потрібен для UX/UI дизайнерів',
      cover: 'https://nashformat.ua/files/slides_resized/2024_11_01_novynka_vid_timoti_snaydera_470h320.640x360.jpg',
      desc: 'Англійська мова в сучасному світі - це перепустка до високооплачуваної роботи. Lorem ipsum dolor sit.',
      date: '14.11.2020',
    },
    {
      id: 3,
      title: '3 Який рівень англійської потрібен для UX/UI дизайнерів',
      cover: 'https://nashformat.ua/files/slides_resized/2024_11_01_novynka_vid_timoti_snaydera_470h320.640x360.jpg',
      desc: 'Англійська мова в сучасному світі - це перепустка до високооплачуваної роботи. Lorem ipsum dolor sit.',
      date: '14.11.2020',
    },
    {
      id: 4,
      title: '4 Який рівень англійської потрібен для UX/UI дизайнерів',
      cover: 'https://nashformat.ua/files/slides_resized/2024_11_01_novynka_vid_timoti_snaydera_470h320.640x360.jpg',
      desc: 'Англійська мова в сучасному світі - це перепустка до високооплачуваної роботи. Lorem ipsum dolor sit.',
      date: '14.11.2020',
    },
    {
      id: 5,
      title: '5 Який рівень англійської потрібен для UX/UI дизайнерів',
      cover: 'https://nashformat.ua/files/slides_resized/2024_11_01_novynka_vid_timoti_snaydera_470h320.640x360.jpg',
      desc: 'Англійська мова в сучасному світі - це перепустка до високооплачуваної роботи. Lorem ipsum dolor sit.',
      date: '14.11.2020',
    },
  ],
  order: {
    id: uuid(),
    orderItems: [
      {
        id: uuid(),
        quantity: 1,
        book: {
          id: uuid(),
          title: 'За Перекопом є земля 2',
          cover: 'https://laboratory.ua/files/products/za-perekopom-ye-zemlia-1000-2.270x435.jpg',
          genre: 'Fiction',
          price: 400,
          stock: true,
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
          genre: 'Fiction, Mystery',
          price: 150,
          stock: true,
        },
        createdAt: '2024-12-16T10:04:48.224Z',
        updatedAt: '2024-12-16T10:24:41.308Z',
      },
    ],
    status: Status.pending,
    totalPrice: 550,
    createdAt: '2024-22-16T10:04:48.224Z',
    updatedAt: '2024-22-16T10:24:41.308Z',
  },
}

export const useProductsStore = create<StoreState>((set) => ({
  allProducts: [],
  newBooks: initialState.newBooks,
  saleBooks: initialState.sale,
  blogs: initialState.blogs,
  orders: initialState.order,

  setAllProducts: (products: BookItemTypeApi[]) => {
    set((_: StoreState) => ({ allProducts: [...products] }))
  },
}))
