import React from 'react'
import { Link } from 'react-router-dom'

import Book from './Book.tsx'

import s from '@/pages/cart/Cart.module.scss'

type FirstStepProps = {
  order: []
}

const FirstStep: React.FC<FirstStepProps> = (props) => {
  const { order } = props

  return (
    <>
      <div className={s.first}>
        {order.orderItems.map(({ book }) => (
          <Book key={book.id} book={book} />
        ))}

        <Link to="/shop" className={s['to-catalog']}>
          <span>&#8592;</span> До каталогу
        </Link>
      </div>
    </>
  )
}

export default FirstStep
