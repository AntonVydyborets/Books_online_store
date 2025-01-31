import { FC, useEffect, useState } from 'react'
import InputControl from '@/components/inputControl/InputControl'
import s from '@/pages/cart/Cart.module.scss'

import { ProductItemType, useOrdersStore } from '@/store/useOrdersStore'

interface BookProps {
  book: ProductItemType
}

const BookAside: FC<BookProps> = ({ book }) => {
  const { setQuantity, removeOrderProduct: removeProduct } = useOrdersStore((state) => state)

  const [count, setCount] = useState<number>(book.quantity ?? 1)
  const [, setPrice] = useState<number>(book.price ? book.price * (book.quantity ?? 1) : 0)

  useEffect(() => {
    setCount(book.quantity || 1)
    setPrice((book.quantity || 1) * (book.price ? book.price : 0))
  }, [book])

  useEffect(() => {
    if (count < 1) setCount(1)
    setPrice(Number(count) * Number(book?.price))
  }, [count, book.price])

  useEffect(() => {
    setQuantity(book.id, Number(count))
  }, [count, book.id, setQuantity])

  const plus = () => {
    setCount((prevState) => (prevState ? prevState + 1 : 1))
  }
  const minus = () => {
    setCount((prevState) => (prevState && prevState > 1 ? prevState - 1 : 1))
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
        <button className={s.remove} onClick={() => removeProduct(book.id)}>
          X
        </button>
      </div>
    </div>
  )
}

export default BookAside
