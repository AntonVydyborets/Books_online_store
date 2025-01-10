import { FC, useCallback, useEffect, useState, useRef } from 'react'
import isEqual from 'lodash/isEqual'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import { useOrdersStore } from '@/store/useOrdersStore.ts'
import s from './СheckoutCard.module.scss'
import iconsReturning from '@/assets/images/icons-returning.svg'
import iconsFreeDeliver from '@/assets/images/icons-free-deliver.svg'
import iconSafety from '@/assets/images/icon-safety.svg'
import { OrderItem, Status } from '@/utils/types/OrderType'
import Breadcrumbs from '../breadcrumbs/Breadcrumbs'
import BookAside from './BookAside'

enum BONUS {
  DISCOUNT = 150,
}

interface OrderType {
  id: string
  orderItems: OrderItem[]
  status: Status
  totalPrice: number
  createdAt: string
  updatedAt: string
}

const useDeepCompareEffect = (callback, dependencies) => {
  const currentDependenciesRef = useRef()
  if (!isEqual(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies
  }
  useEffect(callback, [currentDependenciesRef.current])
}

const СheckoutCard: FC = () => {
  const { orders, setTotalPrice } = useOrdersStore((state) => state)
  const [step, setStep] = useState<number>(1)

  const totalPrice = useCallback(
    (arr: OrderType) => {
      let res: number = 0
      arr?.orderItems.forEach((item) => (res += item?.book?.price * item.quantity))
      setTotalPrice(res)
    },
    [setTotalPrice]
  )

  const nextStep = () => {
    setStep((step) => step + 1)
  }

  useDeepCompareEffect(() => {
    totalPrice(orders)
  }, [orders])

  return (
    <>
      <section className={s.container}>
        <Breadcrumbs step={step} />
        <div className={s.wrapper}>
          <div className={s.left}>
            {step === 1 && <FirstStep order={orders} nextStep={nextStep} />}
            {step === 2 && <SecondStep nextStep={nextStep} />}
            {step === 3 && <ThirdStep />}
          </div>
          <div className={s.right}>
            <h3>Замовлення</h3>
            <div className={s['checkout-sidebar']}>
              {step > 1 && orders.orderItems.map(({ book }) => (
                <BookAside key={book.id} book={book} />
              ))}
              <div className={s['checkout-totals']}>
                <div>
                  <p>Сума ({orders.orderItems.length} позиції)</p>
                  <p>{orders.totalPrice || '0'} грн</p>
                </div>
                <div>
                  <p>Знижка</p>
                  <p>{BONUS.DISCOUNT} грн</p>
                </div>
              </div>
              <div className={s.total}>
                <p>Загальна сума</p>
                <p>{orders.totalPrice || '0'} грн</p>
              </div>
            </div>
            {step === 1 && (
              <button className={s.btn} onClick={() => nextStep()}>
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
          <p>БЕЗКОШТОВНА ДОСТАВКА ДЛЯ ЗАМОВЛЕНЬ НА СУМУ ВІД 2000 ГРН</p>
        </div>
      </section>
    </>
  )
}

export default СheckoutCard
