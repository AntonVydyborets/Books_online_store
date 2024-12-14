import { FC } from 'react'

import { FilterType } from '@/utils/types/FilterType.ts'

import s from './FilterLabels.module.scss'

interface FilterLabelsProps {
  items: FilterType[]
  handleCheckboxChange: (item: FilterType) => void
  selectedFilters: FilterType[]
}

const FilterLabels: FC<FilterLabelsProps> = ({ items, handleCheckboxChange, selectedFilters }) => {
  return (
    <>
      {items.map((item) => (
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
    </>
  )
}

export default FilterLabels
