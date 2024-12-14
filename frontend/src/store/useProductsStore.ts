import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

import { BookItemType } from '@/utils/types/BookItemType'

interface StoreState {
  allProducts: BookItemType[]
  newBooks: BookItemType[]
  saleBooks: BookItemType[]
}

const initialState = {
  allProducts: [
    {
      id: uuid(),
      title: 'За Перекопом є земля 1',
      cover: 'https://laboratory.ua/files/products/za-perekopom-ye-zemlia-1000-2.1800x1200w.jpg',
      genre: 'Fiction',
      price: '470',
      stock: true,
    },
    {
      id: uuid(),
      title: 'За Перекопом є земля 2',
      cover: 'https://laboratory.ua/files/products/za-perekopom-ye-zemlia-1000-2.1800x1200w.jpg',
      genre: 'Fiction',
      price: '400',
      stock: true,
    },
    {
      id: uuid(),
      title: 'За Перекопом є земля 3',
      cover: 'https://laboratory.ua/files/products/za-perekopom-ye-zemlia-1000-2.1800x1200w.jpg',
      genre: 'Fiction',
      price: '670',
      stock: true,
    },
    {
      id: uuid(),
      title: 'За Перекопом є земля 4',
      cover: 'https://laboratory.ua/files/products/za-perekopom-ye-zemlia-1000-2.1800x1200w.jpg',
      genre: 'Fiction',
      price: '470',
      stock: true,
    },
    {
      id: uuid(),
      title: 'За Перекопом є земля 5',
      cover: 'https://laboratory.ua/files/products/za-perekopom-ye-zemlia-1000-2.1800x1200w.jpg',
      genre: 'Fiction',
      price: '370',
      stock: true,
    },
    {
      id: uuid(),
      title: 'За Перекопом є земля 5',
      cover: 'https://laboratory.ua/files/products/za-perekopom-ye-zemlia-1000-2.1800x1200w.jpg',
      genre: 'Fiction',
      price: '370',
      stock: true,
    },
  ],
  newBooks: [
    {
      id: uuid(),
      title: 'За Перекопом є земля 1',
      cover: 'https://laboratory.ua/files/products/za-perekопом-ye-земля-1000-2.1800x1200w.jpg',
      genre: 'Fiction',
      price: '470',
      stock: true,
    },
    {
      id: uuid(),
      title: 'За Перекопом є земля 2',
      cover: 'https://laboratory.ua/files/products/za-perekопом-ye-земля-1000-2.1800x1200w.jpg',
      genre: 'Fiction',
      price: '400',
      stock: true,
    },
    {
      id: uuid(),
      title: 'За Перекопом є земля 3',
      cover: 'https://laboratory.ua/files/products/za-perekопом-ye-земля-1000-2.1800x1200w.jpg',
      genre: 'Fiction',
      price: '670',
      stock: true,
    },
    {
      id: uuid(),
      title: 'За Перекопом є земля 4',
      cover: 'https://laboratory.ua/files/products/za-perekопом-ye-земля-1000-2.1800x1200w.jpg',
      genre: 'Fiction',
      price: '470',
      stock: true,
    },
    {
      id: uuid(),
      title: 'За Перекопом є земля 5',
      cover: 'https://laboratory.ua/files/products/za-perekопом-ye-земля-1000-2.1800x1200w.jpg',
      genre: 'Fiction',
      price: '370',
      stock: true,
    },
  ],
  sale: [
    {
      id: uuid(),
      title: 'Закохані в життя, одружені на смерті 1',
      cover: 'https://propalahramota.com/storage/product/md/JLKTdDv9R8m6BXjjMUmVQ8IaR70zC75GoY2g4vm7.jpeg',
      genre: 'Fiction, Mystery',
      price: '150',
      stock: true,
    },
    {
      id: uuid(),
      title: 'Закохані в життя, одружені на смерті 2',
      cover: 'https://propalahramota.com/storage/product/md/JLKTdDv9R8m6BXjjMUmVQ8IaR70zC75GoY2g4vm7.jpeg',
      genre: 'Fiction, Mystery',
      price: '50',
      stock: true,
    },
    {
      id: uuid(),
      title: 'Закохані в життя, одружені на смерті 3',
      cover: 'https://propalahramota.com/storage/product/md/JLKTdDv9R8m6BXjjMUmVQ8IaR70zC75GoY2g4vm7.jpeg',
      genre: 'Fiction, Mystery',
      price: '280',
      stock: true,
    },
    {
      id: uuid(),
      title: 'Закохані в життя, одружені на смерті 4',
      cover: 'https://propalahramota.com/storage/product/md/JLKTdDv9R8m6BXjjMUmVQ8IaR70zC75GoY2g4vm7.jpeg',
      genre: 'Fiction, Mystery',
      price: '350',
      stock: true,
    },
    {
      id: uuid(),
      title: 'Закохані в життя, одружені на смерті 5',
      cover: 'https://propalahramota.com/storage/product/md/JLKTdDv9R8m6BXjjMUmVQ8IaR70zC75GoY2g4vm7.jpeg',
      genre: 'Fiction, Mystery',
      price: '490',
      stock: true,
    },
    {
      id: uuid(),
      title: 'Закохані в життя, одружені на смерті 6',
      cover: 'https://propalahramota.com/storage/product/md/JLKTdDv9R8m6BXjjMUmVQ8IaR70zC75GoY2g4vm7.jpeg',
      genre: 'Fiction, Mystery',
      price: '140',
      stock: true,
    },
    {
      id: uuid(),
      title: 'Закохані в життя, одружені на смерті 7',
      cover: 'https://propalahramota.com/storage/product/md/JLKTdDv9R8m6BXjjMUmVQ8IaR70zC75GoY2g4vm7.jpeg',
      genre: 'Fiction, Mystery',
      price: '650',
      stock: true,
    },
  ],
}

const useProductsStore = create<StoreState>(() => ({
  allProducts: initialState.allProducts,
  newBooks: initialState.newBooks,
  saleBooks: initialState.sale,
}))

export default useProductsStore
