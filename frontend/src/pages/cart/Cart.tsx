import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router'

import SecondStep from '@/components/checkoutCard/SecondStep'
import ThirdStep from '@/components/checkoutCard/ThirdStep'
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs'
import BookAside from '@/components/checkoutCard/BookAside'
import Book from '@/components/checkoutCard/Book'

import Footer from '@/layout/footer/Footer'
import Header from '@/layout/header/Header'

import iconsReturning from '@/assets/images/icons-returning.svg'
import iconsFreeDeliver from '@/assets/images/icons-free-deliver.svg'
import DeliverBanner from '@/assets/images/delivery-banner.png'
import iconSafety from '@/assets/images/icon-safety.svg'

import { useOrdersStore } from '@/store/useOrdersStore.ts'

import s from './Cart.module.scss'
import clsx from 'clsx'

const Cart = () => {
  const { order, totalPrice, setTotalPrice, setOrderInfo } = useOrdersStore((state) => state)
  const [step, setStep] = useState<number>(1)
  const navigate = useNavigate()

  const nextStep = () => {
    setStep((step) => step + 1)
  }

  const orderInfo = useMemo(() => order.map(({ id, quantity }) => ({ id, quantity })), [order])

  const setInfoForOrder = () => {
    navigate('/checkout')
  }

  useEffect(() => {
    setOrderInfo(orderInfo)

    const total = order.reduce((accumulator, item) => {
      return accumulator + (item.price ?? 0) * (item.quantity ?? 0)
    }, 0)

    setTotalPrice(total)
  }, [order, setTotalPrice, orderInfo, setOrderInfo])

  return (
    <>
      <Header />
      <section className={s.container}>
        <Breadcrumbs step={step} />
        <div className={s.wrapper}>
          <div className={s.left}>
            {order.length === 0 && (
              <div className={s.empty}>
                <p>Ваш кошик поки що порожній. </p>
                <p>Додайте книги, які вас цікавлять!</p>
              </div>
            )}
            {step === 1 && (
              <div className={s.first}>
                {order.map((i) => (
                  <Book key={i.id} book={i} />
                ))}

                <Link to="/shop" className={s['to-catalog']}>
                  <span>&#8592;</span> До каталогу
                </Link>
              </div>
            )}

            {step === 2 && <SecondStep nextStep={nextStep} />}
            {step === 3 && <ThirdStep />}
          </div>
          <div className={s.right}>
            <h3>Замовлення</h3>
            <div className={s['checkout-sidebar']}>
              {step > 1 && order.map(({ book }) => <BookAside key={book.id} book={book} />)}
              <div className={s['checkout-totals']}>
                <div>
                  <p>Сума ({order.length} позиції)</p>
                  <p>{totalPrice || '0'} грн</p>
                </div>
              </div>
              <div className={s.total}>
                <p>Загальна сума</p>
                <p>{totalPrice || '0'} грн</p>
              </div>
            </div>
            {order.length === 0 && (
              <button className={clsx(s.btn, s.disabled)}>
                Далі
              </button>
            )}
            {step === 1 && order.length > 0 &&(
              <button className={s.btn} onClick={() => setInfoForOrder()}>
                Далі
              </button>
            )}
            <p className={s.note}>
              <span>Замітка:</span> Натискаючи «ОПЛАТИТИ», ви погоджуєтеся з нашими Умовами обслуговування, Політикою
              повернення коштів та Політикою конфіденційності.
            </p>
            <div className={s.conditions}>
              <div className={s.row}>
                <img src={iconsReturning} alt="icons-returning" />
                <p>ВИ МОЖЕТЕ ПОВЕРНУТИ ЗАМОВЛЕННЯ ПРОТЯГОМ 14 ДНІВ</p>
              </div>
              <div className={s.row}>
                <img src={iconsFreeDeliver} alt="icons-free-deliver" />
                <p>БЕЗКОШТОВНА ДОСТАВКА ДЛЯ ЗАМОВЛЕНЬ НА СУМУ ВІД 2000 ГРН</p>
              </div>
              <div className={s.row}>
                <img src={iconSafety} alt="icon-safety" />
                <p>БЕЗПЕЧНА ОПЛАТА</p>
              </div>
            </div>
          </div>
        </div>
        <div className={s.bottom}>
          <img src={DeliverBanner} alt="icons-free-deliver" />
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Cart
