import { create } from 'zustand'

import { FilterType } from '@/utils/types/FilterType'

interface StoreState {
  selectedFilters: FilterType[]
  selectFilter: (value: FilterType) => void
  removeFilter: (id: string) => void
}

export const useFiltersStore = create<StoreState>((set) => ({
  selectedFilters: [],

  selectFilter: (value: FilterType) =>
    set((state: StoreState) => ({
      selectedFilters: state.selectedFilters.some((f) => f.id === value.id)
        ? state.selectedFilters.filter((f) => f.id !== value.id)
        : value.type === 'available'
          ? [value.title === 'Всі' ? { ...value, title: '0' } : { ...value, title: '1' }]
          : [...state.selectedFilters, value],
    })),

  removeFilter: (id: string) =>
    set((state: StoreState) => ({ selectedFilters: state.selectedFilters.filter((f) => f.id !== id) })),
}))
