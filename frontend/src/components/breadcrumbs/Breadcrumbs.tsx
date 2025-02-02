import { FC } from 'react'
import clsx from 'clsx'
import s from './Breadcrumbs.module.scss'

interface BreadcrumbsProps {
  step: number
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ step }) => {
  return (
    <div className={s.container}>
      <div className={clsx(s.base, step === 1 && s.active, step > 1 && s.pass)}>Корзина</div>
      <div className={clsx(s.base, step === 2 && s.active, step > 2 && s.pass)}>Доставка</div>
      <div className={clsx(s.base, step === 3 && s.active, step > 3 && s.pass)}>Оплата</div>
      <div className={clsx(s.base, step === 4 && s.active)}>Підтвердження</div>
    </div>
  )
}

export default Breadcrumbs
