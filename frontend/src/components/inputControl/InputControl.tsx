import React from 'react'
import s from './InputControl.module.scss'

type InputControlProps = {
  count: number | 0
  plus: () => void
  minus: () => void
}

const InputControl: React.FC<InputControlProps> = ({ count, plus, minus }) => {
  return (
    <div className={s['product-quantity']}>
      <p className={s.minus} onClick={() => minus()}>
        -
      </p>
      <p>{count}</p>
      <p className={s.plus} onClick={() => plus()}>
        +
      </p>
    </div>
  )
}

export default InputControl
