import { FC } from 'react'

import s from './FilterLabel.module.scss'

interface FilterLabelProps {
  items: { id: number; title: string }[]
}

const FilterLabel: FC<FilterLabelProps> = ({ items }) => {
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

export default FilterLabel
