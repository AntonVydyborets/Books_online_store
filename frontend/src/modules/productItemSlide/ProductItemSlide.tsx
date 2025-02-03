import { FC } from 'react'
import { Link } from 'react-router-dom'

import star_icon from '@/assets/images/product/star.svg'
import product_img from '@/assets/images/default-book.png'

import { ProductItemType, useOrdersStore } from '@/store/useOrdersStore'

import { BookItem } from '@/utils/types/BookItemType.ts'

import { Typography } from '@/ui'

import s from './ProductItemSlide.module.scss'
import { fetchBookImageById } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const ProductItemSlide: FC<BookItem> = ({ id, author, price, title, rating, genres, is_available = true, cover }) => {
  const { setOrderProduct } = useOrdersStore((state) => state)

  const { data } = useQuery({
    queryKey: ['image', id],
    queryFn: () => fetchBookImageById(`${id}`),
    enabled: !!id, // Only run this query when searchKeywords is present
  })
  const cover = data ? URL.createObjectURL(data as Blob) : ''
  const addToCart = () => {
    const prod: ProductItemType = {
      id,
      title: title,
      author,
      price,
      cover,
      genres,
      quantity: 1,
    }

    setOrderProduct(prod)
  }
  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault()

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      addToCart()
    } catch (error) {
      console.error('Failed to remove product:', error)
    }
  }

  return (
    <div className={s.product_grid_item}>
      <div className={s.product_grid_item__top}>
        <div className={s.product_grid_item__wrap}>
          <div className={s.product_labels}>
            <div className={s.product_labels__item}>Подарунок</div>
          </div>
          <img className={s.product_image} src={cover || product_img} alt="product image" />
        </div>
      </div>
      <div className={s.product_grid_item__bottom}>
        <Typography className={s.product_grid_item__bottom__title} tag="h6">
          <Link to={`/books/${id}`}>{title}</Link>
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
        <button className={s.product_grid_item__bottom__btn} onClick={handleAddToCart}>
          У кошик
        </button>
      </div>
    </div>
  )
}

export default ProductItemSlide
