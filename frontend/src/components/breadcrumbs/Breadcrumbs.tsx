import { FC } from 'react'
import clsx from 'clsx'
import s from './Breadcrumbs.module.scss'

interface BreadcrumbsProps {
  step: number
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ step }) => {
  return (
    <div className={s.container}>
      <div className={clsx(s.base, step === 1 && s.active, step > 1 && s.pass)}>
        <span></span>
        <p>Корзина</p>
      </div>
      <div className={clsx(s.base, step === 2 && s.active, step > 2 && s.pass)}>
        <span></span>
        <p>Доставка</p>
      </div>
      <div className={clsx(s.base, step === 2 && s.active, step > 2 && s.pass)}>
        <span></span>
        <p>Оплата</p>
      </div>
      <div className={clsx(s.base, step === 3 && s.active)}>
        <span></span>
        <p>Підтвердження</p>
      </div>
    </div>
  )
}

export default Breadcrumbs
