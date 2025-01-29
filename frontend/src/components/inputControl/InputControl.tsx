import s from './InputControl.module.scss'

const InputControl = ({count, plus, minus}) => {
  return (
    <div className={s['product-quantity']}>
      <p className={s.minus} onClick={() => minus()}>-</p>
      <p>{count}</p>
      <p className={s.plus} onClick={() => plus()}>+</p>
    </div>
  )
}

export default InputControl
