import { FC } from 'react'

import { RequiredBookItemTypeApi } from '@/utils/types/BookItemType.ts'

import { BaseButton } from '@/ui'

import s from './ProductItem.module.scss'

const ProductItem: FC<RequiredBookItemTypeApi> = ({ genre, price, is_available, name }) => {
  return (
    <div>
      <div className={s.container}>
        <div className={s['img-wrap']}>
          <img src="https://laboratory.ua/files/products/za-perekopom-ye-zemlia-1000-2.1800x1200w.jpg" alt={name} />
        </div>
        <div className={s['content-wrap']}>
          <h6 className={s.title}>{name}</h6>
          <p className={s.genre}>{genre}</p>
          <p className={s.price}>{price} грн.</p>
          <p className={s.stock}>{is_available ? 'В наявності' : 'Out of stock'}</p>
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
