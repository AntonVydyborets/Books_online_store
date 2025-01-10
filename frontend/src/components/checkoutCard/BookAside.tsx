import { FC, useEffect, useState } from 'react'
import InputControl from '@/components/inputControl/InputControl'
import s from './СheckoutCard.module.scss'
import { BookItemType } from '@/utils/types/BookItemType'
import { useOrdersStore } from '@/store/useOrdersStore'

interface BookProps {
  book: BookItemType
}

const BookAside: FC<BookProps> = ({ book }) => {
  const { setQuantity } = useOrdersStore((state) => state)

  const [count, setCount] = useState(book.quantity)
  const [price, setPrice] = useState(book.price)

  useEffect(() => {
    setCount(book.quantity || 1)
    setPrice(book.quantity * book.price || 0)
  }, [book])

  useEffect(() => {
    if (count < 1) setCount(1)
    setPrice(Number(count) * Number(book.price))
  }, [count, book.price])

  useEffect(() => {
    setQuantity(book.id, Number(count))
  }, [count, book.id, setQuantity])

  const plus = () => {
    setCount((prevState: number) => Number(prevState) + 1)
  }
  const minus = () => {
    setCount((prevState: number) => Number(prevState) - 1)
  }
  return (
    <div className={s['product-card']}>
      <div className={s.cover}>
        <img src={book.cover} alt={book.title} />
      </div>
      <div className={s.details}>
        <p className={s.title}>{book.title}</p>
        {book.author && <p className={s.author}>{book.author}</p>}
      </div>
      <div className={s.actions}>
        <InputControl count={count} plus={plus} minus={minus} />
        <button className={s.remove} onClick={() => {}}>
          X
        </button>
      </div>
    </div>
  )
}

export default BookAside
