import { FilterType } from '@/utils/types/FilterType'
import { v4 as uuid } from 'uuid'

export const genreFilterItems: FilterType[] = [
  {
    id: uuid(),
    title: 'Science Fiction',
    type: 'genre',
  },
  {
    id: uuid(),
    title: 'Cookbook',
    type: 'genre',
  },
  {
    id: uuid(),
    title: 'Romance',
    type: 'genre',
  },
  {
    id: uuid(),
    title: 'Historical Fiction',
    type: 'genre',
  },
  {
    id: uuid(),
    title: 'Economics',
    type: 'genre',
  },
  {
    id: uuid(),
    title: 'Poetry',
    type: 'genre',
  },
  {
    id: uuid(),
    title: 'Technology',
    type: 'genre',
  },
  {
    id: uuid(),
    title: 'Environmental Science',
    type: 'genre',
  },
  {
    id: uuid(),
    title: 'Food & Drink',
    type: 'genre',
  },
]

export const publisherFilterItems: FilterType[] = [
  {
    id: uuid(),
    title: 'Nordic Science Press',
    type: 'publisher',
  },
  {
    id: uuid(),
    title: 'Wine & Spirits Publications',
    type: 'publisher',
  },
  {
    id: uuid(),
    title: 'Wellness Books',
    type: 'publisher',
  },
  {
    id: uuid(),
    title: 'Quantum Press',
    type: 'publisher',
  },
]
