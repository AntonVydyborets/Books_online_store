import { FilterType } from '@/utils/types/FilterType'
import { v4 as uuid } from 'uuid'

export const genreFilterItems: FilterType[] = [
  {
    id: uuid(),
    title: 'Художня',
    type: 'genres',
  },
  {
    id: uuid(),
    title: 'Документальна',
    type: 'genres',
  },
  {
    id: uuid(),
    title: 'Освітня',
    type: 'genres',
  },
  {
    id: uuid(),
    title: 'Дитяча',
    type: 'genres',
  },
]

export const publisherFilterItems: FilterType[] = [
  {
    id: uuid(),
    title: 'Ранок',
    type: 'publisher',
  },
  {
    id: uuid(),
    title: 'Сімейний клуб дозвілля',
    type: 'publisher',
  },
  {
    id: uuid(),
    title: 'Віват',
    type: 'publisher',
  },
  {
    id: uuid(),
    title: 'Видавництво Старого Лева',
    type: 'publisher',
  },
  {
    id: uuid(),
    title: 'Фоліо',
    type: 'publisher',
  },
  {
    id: uuid(),
    title: 'А-Ба-Ба-Га-Ла-Ма-Га',
    type: 'publisher',
  },
  {
    id: uuid(),
    title: 'Видавництво Основи',
    type: 'publisher',
  },
  {
    id: uuid(),
    title: 'Кальварія',
    type: 'publisher',
  },
  {
    id: uuid(),
    title: 'Наш Формат',
    type: 'publisher',
  },
  {
    id: uuid(),
    title: 'Смолоскип',
    type: 'publisher',
  },
]
export const availableFilterItems: FilterType[] = [
  {
    id: uuid(),
    title: 'У наявності',
    type: 'available',
  },
  {
    id: uuid(),
    title: 'Всі',
    type: 'available',
  },
]
