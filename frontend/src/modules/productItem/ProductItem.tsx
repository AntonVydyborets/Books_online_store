import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

import star_icon from '@/assets/images/product/star-dark.svg'
import product_img from '@/assets/images/default-book.png'
import heart from '@/assets/images/heart.svg'
import heartDark from '@/assets/images/heart-dark.svg'

import { ProductItemType, useOrdersStore } from '@/store/useOrdersStore'

import { BookItem } from '@/utils/types/BookItemType.ts'

import { Typography } from '@/ui'

import s from './ProductItem.module.scss'

const ProductItem: FC<BookItem> = ({ id, author, price, cover, title, rating, genre, is_available = true }) => {
  const [isRemoving, setIsRemoving] = useState<boolean>(false)

  const { setOrderProduct } = useOrdersStore((state) => state)

  const addToCart = () => {

    const prod: ProductItemType = {
      id,
      title: title,
      author,
      price,
      cover,
      genre,
      quantity: 1,
    }

    setOrderProduct(prod)
  }

  const handleAddToCart = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    setIsRemoving(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      addToCart()
    } catch (error) {
      console.error('Failed to remove product:', error)
    } finally {
      setIsRemoving(false)
    }
  }

  return (
    <div className={s.product_grid_item}>
      <p className={s.product_grid_item__liked}>
        <img src={heartDark} alt="heartDark" />
      </p>
      <div className={s.product_grid_item__top}>
        <p className={s.product_grid_item__genre}>{genre ? genre : ''}</p>
        <div className={s.product_labels}>
          <div className={s.product_labels__item}>Подарунок</div>
        </div>
        <img className={s.product_image} src={cover || product_img} alt="product image" />
      </div>
      <div className={s.product_grid_item__bottom}>
        <Typography className={s.product_grid_item__bottom__title} tag="h6">
          {title}
        </Typography>
        <p className={s.product_grid_item__bottom__author}>{author}</p>
        <div className={s.product_grid_item__bottom__rating}>
          <div>
            <img src={star_icon} alt="start icon" />
          </div>
          <div>{rating}</div>
        </div>
        <p className={s.product_grid_item__bottom__price}>
          <span>{price} грн</span>
        </p>
        <div className={s.product_grid_item__bottom__available}>{is_available ? 'В наявності' : 'Продано'}</div>
      </div>
      <div className={s.product_grid_item__hover}>
        <Link to={`/books/${id}`} className={s.product_grid_item__hover__link}>
          Переглянути
        </Link>
        <button className={s.product_grid_item__hover__btn} onClick={(e) => handleAddToCart(e)}>
          У кошик
        </button>
        <p className={s.product_grid_item__hover__liked}>
          <img src={heart} alt="heart" />
          Додати в обране
        </p>
      </div>
    </div>
  )
}

export default ProductItem
