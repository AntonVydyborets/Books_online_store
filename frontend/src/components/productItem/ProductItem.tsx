import { FC } from 'react'

import { BookItemType } from '@/utils/types/BookItemType.ts'

import BaseButton from '@/ui/baseButton/BaseButton'

import s from './ProductItem.module.scss'

const ProductItem: FC<BookItemType> = ({ id, genre, price, stock, title, cover }) => {
  return (
    <div className={`product-${id}`}>
      <div className={s.container}>
        <div className={s['img-wrap']}>
          <img src={cover} alt="title" />
        </div>
        <div className={s['content-wrap']}>
          <h6 className={s.title}>{title}</h6>
          <p className={s.genre}>{genre}</p>
          <p className={s.price}>{price} грн.</p>
          <p className={s.stock}>{stock ? 'В наявності' : 'Out of stock'}</p>
          <div className={s['cost-block']}>
            <BaseButton>Купити</BaseButton>
            <p>icon</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
