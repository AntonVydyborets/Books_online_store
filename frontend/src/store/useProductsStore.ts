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
    set((_: StoreState) => ({ allProducts: [...products] }))
  },
  setSearchKeywords: (keywords: string) => {
    set({ searchKeywords: keywords })
  },
}))
