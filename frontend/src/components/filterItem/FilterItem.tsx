import { FC } from 'react'

import clsx from 'clsx'

import { useFiltersStore } from '@/store/useFiltersStore.ts'

import { FilterType } from '@/utils/types/FilterType.ts'

import { BaseInput, Typography } from '@/ui'

import s from './FilterItem.module.scss'

interface FilterItemProps {
  isSearch?: boolean
  title: string
  filterItems: FilterType[]
  className?: string
}

const FilterItem: FC<FilterItemProps> = ({ isSearch, title, filterItems, className }) => {
  const selectedFilters = useFiltersStore((state) => state.selectedFilters)
  const selectFilter = useFiltersStore((state) => state.selectFilter)

  const handleCheckboxChange = (item: FilterType) => {
    selectFilter(item)
  }

  return (
    <div className={s.filterItem}>
      <Typography className={clsx(s.filterItem__title, className)} tag="h5">
        {title}
      </Typography>

      {isSearch && <BaseInput placeholder="Пошук" />}

      {filterItems.map((item) => (
        <div key={item.id} className={s.filterItem__label}>
          <input
            type="checkbox"
            id={`check-${item.id}`}
            onChange={() => handleCheckboxChange(item)}
            checked={selectedFilters.some((f) => f.id === item.id)}
          />
          <label htmlFor={`check-${item.id}`}>{item.title}</label>
        </div>
      ))}
    </div>
  )
}

export default FilterItem
