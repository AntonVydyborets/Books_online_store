import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/shared'
import { BookItem } from '@/utils/types/BookItemType'
import s from './BookPreview.module.scss'

interface BookItemProps {
  book: BookItem | null
}

const BookPreview: FC<BookItemProps> = ({ book }) => {
  const { title, author, cover, rating, is_available, price } = book
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
            * {`${rating}` || null}
            <span>Оцінити</span>
          </p>
          <p className={s.available}>{is_available ? 'У наявності' : 'Розпродано'}</p>
          <p className={s.price}>{`${price || null} грн`}</p>
          <button>До кошика</button>
        </div>
      </div>
    </Container>
  )
}

export default BookPreview
