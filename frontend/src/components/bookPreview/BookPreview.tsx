import { FC, useState } from 'react'
import clsx from 'clsx'
import { Container } from '@/shared'
import { BookItem } from '@/utils/types/BookItemType'
import s from './BookPreview.module.scss'
import Tick from './Tick'
import Star from './Star'
import { ProductItemType, useOrdersStore } from '@/store/useOrdersStore'

import product_img from '@/assets/images/default-book.png'
import notAddedBook from '@/assets/images/not-added-book.svg'
import addedBook from '@/assets/images/added-book.svg'

interface BookItemProps {
  book: BookItem | null
}

const BookPreview: FC<BookItemProps> = ({ book }) => {
  const [rate, setRating] = useState<number | null>(null)
  const [hover, setHover] = useState<number | null>(null)
  const [tab, setTab] = useState('desc')
  const [isAdded, setIsAdded] = useState<boolean>(false)

  const { setOrderProduct } = useOrdersStore((state) => state)

  if (!book) {
    return null
  }

  const {
    id,
    title,
    price,
    description,
    author,
    publisher,
    genre,
    publication_year,
    country_of_origin,
    text_language,
    cover,
    rating,
    is_available,
  } = book

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

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      addToCart()
      setIsAdded(true)
    } catch (error) {
      console.error('Failed to remove product:', error)
      setIsAdded(false)
    }
  }
  return (
    <Container>
      <div className={s.wrap}>
        <div className={s.cover}>
          <img src={cover || product_img} alt={title} />
        </div>
        <div className={s.content}>
          <p className={s.title}>{title || null}</p>
          <p className={s.author}>{author || null}</p>
          <div className={s.rating}>
            <p className={s.rate}>
              <Star color="#1A1D23" /> {`${rating}` || null}
            </p>
            <div className={s.estimate}>
              <span>Оцінити</span>
              <div>
                {[...Array(5)].map((star, index) => {
                  const currentRating = index + 1
                  return (
                    <label key={index}>
                      <input
                        key={star}
                        type="radio"
                        name="rating"
                        value={currentRating}
                        onChange={() => setRating(currentRating)}
                      />
                      <Star
                        className={s.star}
                        style={{
                          fill: currentRating <= (hover ?? rate ?? 0) ? '#ffc107' : '#e4e5e9',
                        }}
                        onMouseEnter={() => setHover(currentRating ?? 0)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  )
                })}
              </div>
            </div>
          </div>
          <p className={s.available}>
            {is_available ? (
              <>
                У наявності <Tick />
              </>
            ) : (
              'Розпродано'
            )}
          </p>
          <p className={s.price}>{`${price || null} грн`}</p>
          <button className={s['add-to-cart']} onClick={(e) => handleAddToCart(e)}>
            {!isAdded ? (
              <>
                <img src={notAddedBook} alt="До кошика" />
                До кошика
              </>
            ) : (
              <>
                <img src={addedBook} alt="Додано до кошика" />
                Додано до кошика
              </>
            )}
          </button>
        </div>
      </div>
      <div className={s.bottom}>
        <div className={s.tabs}>
          <div className={clsx(tab === 'desc' && s.active, s.tab)} onClick={() => setTab('desc')}>
            Опис
          </div>
          <div className={clsx(tab === 'char' && s.active, s.tab)} onClick={() => setTab('char')}>
            Характеристики
          </div>
          <div className={clsx(tab === 'comment' && s.active, s.tab)} onClick={() => setTab('comment')}>
            Відгуки читачів
          </div>
        </div>
        <div className={s.text}>
          {tab === 'desc' && <p className={s.description}>{description || null}</p>}
          {tab === 'char' && (
            <div className={s.chars}>
              <p className={s.title}>Характеристики</p>
              <table>
                <tbody className={s.list}>
                  <tr>
                    <td>Видавництво</td>
                    <td>{publisher || null}</td>
                  </tr>
                  <tr>
                    <td>Категорії</td>
                    <td>{genre || null}</td>
                  </tr>
                  <tr>
                    <td>Рік видання</td>
                    <td>{publication_year || null}</td>
                  </tr>
                  <tr>
                    <td>Країна видання</td>
                    <td>{country_of_origin || null}</td>
                  </tr>
                  <tr>
                    <td>Мова</td>
                    <td>{text_language || null}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {tab === 'comment' && <p className={s.comments}>Відгуки читачів</p>}
        </div>
      </div>
    </Container>
  )
}

export default BookPreview
