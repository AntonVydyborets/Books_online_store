import { FC } from 'react'

import s from './FilterLabels.module.scss'

interface FilterLabelsProps {
  items: { id: number; title: string }[]
}

const FilterLabels: FC<FilterLabelsProps> = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <div key={item.id} className={s.filterItem__label}>
          <input type="checkbox" id={`check-${item.id}`} />
          <label htmlFor={`check-${item.id}`}>{item.title}</label>
        </div>
      ))}
    </>
  )
}

export default FilterLabels
