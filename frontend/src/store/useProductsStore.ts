import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

import { BookItem, BookItemType } from '@/utils/types/BookItemType'
import { BlogItemType } from '@/utils/types/BlogItemType.ts'

interface StoreState {
  allProducts: BookItem[]
  newBooks: BookItemType[]
  saleBooks: BookItemType[]
  blogs: BlogItemType[]
  bookById: BookItem

  searchKeywords: string
  setSearchKeywords: (keywords: string) => void
  setAllProducts: (products: BookItem[]) => void
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
      title: 'Паперові чи електронні?',
      desc: 'Як читати в епоху технологій',
      date: '16 січня 2025 року',
    },
    {
      id: 2,
      title: 'Книги в подорожі',
      desc: 'Чи береш книгу з собою?',
      date: '15 грудня 2024 року',
    },
    {
      id: 3,
      title: 'Читання вдома',
      desc: 'Секрети затишних вечорів з книгою',
      date: '2 грудня 2024 року',
    },
    {
      id: 4,
      title: 'Читання з дитинства',
      desc: 'Як заохотити дітей до книг?',
      date: '17 листопада 2024 року',
    },
    {
      id: 5,
      title: 'Бібліотека майбутнього',
      desc: 'Як змінюються сховища знань?',
      date: '18 жовтня 2024 року',
    },
  ],
  searchKeywords: '',
  book: {
    id: '12345',
    title: 'На білому коні. На коні вороному',
    price: 670,
    description:
      'У літературній творчості Улас Самчук (1905—1987) був літописцем змагань українського народу протягом сучасного йому півстоліття. Визначне місце в творчості Самчука посідає публіцистика, своєрідні подорожні нотатки. У творі «На білому коні» У. Самчук створив образ історичної батьківщини довоєнного періоду, «радянського життя». Автор розповідає про зустрічі з поетами Оленою Телігою, Олегом Ольжичем, Євгеном Маланюком, кінорежисером і скульптором Іваном Кавалерідзе, письменником Віктором Петровим (Домонтовичем), актрисою Тетяною Праховою, Степаном Скрипником (єпископом Мстиславом), отаманом Тарасом Бульбою-Боровцем. «На коні вороному» — це щемливе, тужливе прощання автора з рідною землею, де його надії не справдилися, прощання назавжди.',
    author: 'Улас Самчук',
    publisher: 'Фоліо',
    genre: 'Історична проза, Класика',
    cover: 'https://readeat.com/storage/app/uploads/public/65c/0ac/5a1/thumb_54104_900_900_0_0_auto.jpg',
    publication_year: 2023,
    country_of_origin: 'Україна',
    text_language: 'українська',
    rating: 10,
    is_available: true,
    created_at: '2024-11-11',
    updated_at: '2024-11-11',
  },
}

export const useProductsStore = create<StoreState>((set) => ({
  allProducts: [],
  newBooks: initialState.newBooks,
  saleBooks: initialState.sale,
  blogs: initialState.blogs,
  searchKeywords: initialState.searchKeywords,
  bookById: initialState.book,

  setAllProducts: (products: BookItem[]) => {
    const modifiedProducts = products.map((product) => {
      return {
        ...product,
        price: product.current_price,
      }
    })
    set((_: StoreState) => ({ allProducts: [...modifiedProducts] }))
  },
  setSearchKeywords: (keywords: string) => {
    set({ searchKeywords: keywords })
  },
}))
