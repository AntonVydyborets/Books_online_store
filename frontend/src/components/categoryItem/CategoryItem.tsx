import { FC } from 'react'
import s from './CategoryItem.module.scss'
import { Link } from 'react-router-dom';

type item = { id: number; title: string }

type titleProps = {
  title: string
  poster: string
  items: item[]
}

const CategoryItem: FC<titleProps> = ({ title, poster,  items }) => {
  return (
    <div className={s.wrap}>
      <h6 className={s.title}>{title}</h6>
      <div className={s['img-wrap']}>
        <img src={poster} alt={title} />
      </div>
      <ul>
        {items.map((item) => (
          <Link to='/' key={item.id} className={s.link}>{item.title}<span></span></Link>
        ))}
      </ul>
    </div>
  )
}

export default CategoryItem
