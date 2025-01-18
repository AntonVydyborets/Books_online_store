import { FC, useState } from 'react'
import { Container } from '@/shared'
import { BookItem } from '@/utils/types/BookItemType'
import s from './BookPreview.module.scss'
import Tick from './Tick'
import Star from './Star'

interface BookItemProps {
  book: BookItem | null
}

const BookPreview: FC<BookItemProps> = ({ book }) => {
  const { title, author, cover, rating, is_available, price } = book
  const [rate, setRating] = useState(null)
  const [hover, setHover] = useState(null)
  return (
    <Container>
      <div className={s.wrap}>
        <div className={s.cover}>
          <img src={cover} alt={title} />
        </div>
        <div className={s.content}>
          <p className={s.title}>{title || null}</p>
          <p className={s.author}>{author || null}</p>
          <p className={s.rating}>
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
                          fill: currentRating <= (hover || rate) ? '#ffc107' : '#e4e5e9',
                        }}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  )
                })}
              </div>
            </div>
          </p>
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
          <button className={s['add-to-cart']}>
            <span></span>
            До кошика
          </button>
        </div>
      </div>
    </Container>
  )
}

export default BookPreview
