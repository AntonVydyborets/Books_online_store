import { FC, useEffect, useState } from 'react'

import InputControl from '@/components/inputControl/InputControl'

import { useOrdersStore } from '@/store/useOrdersStore'

import { BookItem } from '@/utils/types/BookItemType'

import s from '@/pages/cart/Cart.module.scss'

interface BookProps {
  book: BookItem
}

const Book: FC<BookProps> = ({ book }) => {
  const { setQuantity } = useOrdersStore((state) => state)

  const [count, setCount] = useState(book.quantity)
  const [price, setPrice] = useState(book.price)

  useEffect(() => {
    setCount(book.quantity || 1)
    setPrice(book?.quantity * book.price || 0)
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
        {book.price && <p className={s.price}>{book.price} грн.</p>}
      </div>
      <div className={s.actions}>
        <InputControl count={count} plus={plus} minus={minus} />
        <p className={s.price}>{price} грн</p>
        <button className={s.remove} onClick={() => {}}>
          X
        </button>
      </div>
    </div>
  )
}

export default Book
