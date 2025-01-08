import { FC, useEffect, useState } from 'react'
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

const СheckoutCard: FC = () => {
  const order = useOrdersStore((state) => state.orders)
  const [step, setStep] = useState<number>(1)

  const countTotal = useOrdersStore((state) => state.setTotalPrice)

  const totalPrice = (arr: OrderType) => {
    let res: number = 0
    arr?.orderItems.forEach((item) => (res += item?.book?.price))
    console.log('res', res)
    return countTotal(res)
  }

  const nextStep = () => {
    setStep((step) => step + 1)
  }

  useEffect(() => {
    totalPrice(order)
  }, [order])

  return (
    <>
      <section className={s.container}>
      <Breadcrumbs step={step} />
        <div className={s.wrapper}>
          <div className={s.left}>
            {step === 1 && <FirstStep order={order} nextStep={nextStep} />}
            {step === 2 && <SecondStep nextStep={nextStep} />}
            {step === 3 && <ThirdStep />}
          </div>
          <div className={s.right}>
            <h3>Замовлення</h3>
            <div className={s['checkout-sidebar']}>
              <div className={s['checkout-totals']}>
                <div>
                  <p>Сума ({order.orderItems.length} позиції)</p>
                  <p>1050 грн</p>
                </div>
                <div>
                  <p>Знижка</p>
                  <p>{BONUS.DISCOUNT} грн</p>
                </div>
              </div>
              <div className={s.total}>
                <p>Загальна сума</p>
                <p>{order.totalPrice || '0'} грн</p>
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
