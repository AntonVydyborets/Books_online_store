import { FC } from 'react'

import { v4 as uuid } from 'uuid'

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
