import { FC, useEffect, useState } from 'react'

import InputControl from '@/components/inputControl/InputControl'

import { ProductItemType, useOrdersStore } from '@/store/useOrdersStore'

import { CircleProgress } from '@/shared'

import { RequiredCartItemType } from '@/utils/types/BookItemType'

import book_img from '@/assets/images/default-book.png'
import s from '@/pages/cart/Cart.module.scss'

interface BookProps {
  book: RequiredCartItemType | ProductItemType
}

const Book: FC<BookProps> = ({ book }) => {
  const { setQuantity, removeOrderProduct } = useOrdersStore((state) => state)
  const [count, setCount] = useState(book.quantity || 1)
  const [price, setPrice] = useState(book.price ?? 0)
  const [isRemoving, setIsRemoving] = useState<boolean>(false)

  useEffect(() => {
    setCount(book.quantity || 1)
    setPrice((book.quantity ?? 1) * (book.price ?? 0))
  }, [book])

  useEffect(() => {
    setQuantity(book.id, Number(count))
  }, [count, book.id, setQuantity])

  const plus = () => {
    setCount((prevState: number) => Number(prevState) + 1)
  }

  const minus = () => {
    setCount((prevState: number) => Number(prevState) - 1)
  }

  const handleRemove = async () => {
    setIsRemoving(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      removeOrderProduct(book.id)
    } catch (error) {
      console.error('Failed to remove product:', error)
    } finally {
      setIsRemoving(false)
    }
  }

  return (
    <>
      <div className={s['product-card']}>
        <div className={s.cover}>
          <img src={book.cover ? book.cover : book_img} alt={book.title} />
        </div>
        <div className={s.details}>
          <p className={s.title}>{book.title}</p>
          {book.author && <p className={s.author}>{book.author}</p>}
          {book.price && <p className={s.price}>{book.price} грн.</p>}
        </div>
        <div className={s.actions}>
          <InputControl count={count} plus={plus} minus={minus} />
          <p className={s.price}>{price} грн</p>
          {isRemoving ? (
            <CircleProgress isButton={true} />
          ) : (
            <button className={s.remove} onClick={handleRemove} disabled={isRemoving}>
              X
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default Book
