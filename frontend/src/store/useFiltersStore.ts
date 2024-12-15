import { create } from 'zustand'

import { FilterType } from '@/utils/types/FilterType'

interface StoreState {
  selectedFilters: FilterType[]
  selectFilter: (value: FilterType) => void
  removeFilter: (id: string) => void
}

const useFiltersStore = create<StoreState>((set) => ({
  selectedFilters: [],

  selectFilter: (value: FilterType) =>
    set((state: StoreState) => ({
      selectedFilters: state.selectedFilters.some((f) => f.id === value.id)
        ? state.selectedFilters.filter((f) => f.id !== value.id)
        : [...state.selectedFilters, value],
    })),
  removeFilter: (id: string) =>
    set((state: StoreState) => ({ selectedFilters: state.selectedFilters.filter((f) => f.id !== id) })),
}))

export default useFiltersStore
