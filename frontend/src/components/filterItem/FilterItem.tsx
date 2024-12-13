import { FC } from 'react'

import FilterLabels from '@/shared/filterLabels/FilterLabels'

import BaseInput from '@/ui/baseInput/BaseInput'
import Typography from '@/ui/typography/Typography'

import s from './FilterItem.module.scss'

interface FilterItemProps {
  isSearch?: boolean
  title: string
}

const labels = [
  {
    id: 1,
    title: 'Фентезі',
  },
  {
    id: 2,
    title: 'Пригоди',
  },
  {
    id: 3,
    title: 'Детективи',
  },
]

const FilterItem: FC<FilterItemProps> = ({ isSearch, title }) => {
  return (
    <div className={s.filterItem}>
      <Typography className={s.filterItem__title} tag="h5">
        {title}
      </Typography>

      {isSearch && <BaseInput placeholder="Пошук" />}

      <FilterLabels items={labels} />
    </div>
  )
}

export default FilterItem
