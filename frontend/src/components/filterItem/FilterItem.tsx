import { FC } from 'react'

import FilterLabel from '@/shared/filterLabel/FilterLabel'

import BaseInput from '@/ui/baseInput/BaseInput'
import Typography from '@/ui/typography/Typography'

import s from './FilterItem.module.scss'

interface FilterItemProps {
  isSearch?: boolean
  title: string
}

const filterItems = [
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

      <FilterLabel items={filterItems} />
    </div>
  )
}

export default FilterItem
