import { FC } from 'react'
import { Link } from 'react-router-dom'

import star_icon from '@/assets/images/product/star.svg'
import product_img from '@/assets/images/product_default_img.jpg'
import cart_icon from '@/assets/images/header/bag-2.svg'

import { BookItem } from '@/utils/types/BookItemType.ts'

import { Typography } from '@/ui'

import s from './ProductItem.module.scss'

const ProductItem: FC<BookItem> = ({ author, price, title, rating }) => {
  return (
    <div className={s.product_grid_item}>
      <div className={s.product_grid_item__top}>
        <Link to={'/'}>
          <div className={s.product_labels}>
            <div className={s.product_labels__item}>Promo</div>
          </div>
          <div className={s.product_labels__icons}>
            <img src={cart_icon} alt="cart icon" />
          </div>
          <img className={s.product_image} src={product_img} alt="product image" />
        </Link>
      </div>
      <div className={s.product_grid_item__bottom}>
        <Typography className={s.product_grid_item__bottom__title} tag="h6">
          <Link to={'/'}>{title}</Link>
        </Typography>
        <p className={s.product_grid_item__bottom__author}>{author}</p>
        <div className={s.product_grid_item__bottom__rating}>
          <div>
            <img src={star_icon} alt="start icon" />
          </div>
          <div>{rating}</div>
        </div>
        <p className={s.product_grid_item__bottom__price}>
          <span className={s.price_item}>Price</span> <span>{price}$</span>
        </p>
      </div>
    </div>
  )
}

export default ProductItem
