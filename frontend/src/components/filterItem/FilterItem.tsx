import { FC } from 'react'

import { v4 as uuid } from 'uuid'

import useFiltersStore from '@/store/useFiltersStore.ts'

import FilterLabels from '@/shared/filterLabels/FilterLabels'

import { FilterType } from '@/utils/types/FilterType.ts'

import BaseInput from '@/ui/baseInput/BaseInput'
import Typography from '@/ui/typography/Typography'

import s from './FilterItem.module.scss'

interface FilterItemProps {
  isSearch?: boolean
  title: string
}

const labels = [
  {
    id: uuid(),
    title: 'Фентезі',
  },
  {
    id: uuid(),
    title: 'Пригоди',
  },
  {
    id: uuid(),
    title: 'Детективи',
  },
]

const FilterItem: FC<FilterItemProps> = ({ isSearch, title }) => {
  const selectedFilters = useFiltersStore((state) => state.selectedFilters)
  const selectFilter = useFiltersStore((state) => state.selectFilter)

  const handleCheckboxChange = (item: FilterType) => {
    selectFilter(item)
  }

  return (
    <div className={s.filterItem}>
      <Typography className={s.filterItem__title} tag="h5">
        {title}
      </Typography>

      {isSearch && <BaseInput placeholder="Пошук" />}

      <FilterLabels handleCheckboxChange={handleCheckboxChange} items={labels} selectedFilters={selectedFilters} />
    </div>
  )
}

export default FilterItem
