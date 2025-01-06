import { useState } from 'react'
import { OrderType } from '@/utils/types/OrderType'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import Book from './Book'
import { useProductsStore } from '@/store/useProductsStore.ts'
import s from './СheckoutCard.module.scss'

import iconsReturning from '@/assets/images/icons-returning.svg'
import iconsFreeDeliver from '@/assets/images/icons-free-deliver.svg'
import iconSafety from '@/assets/images/icon-safety.svg'

const СheckoutCard = () => {
  const orders = useProductsStore((state) => state.orders)
  const [step, setStep] = useState<number>(1)
  const [order, setOrder] = useState(orders)
  const nextStep = () => {
    setStep((step) => step + 1)
  }

  return (
    <>
      <section className={s.container}>
        <div className={s.grid}>
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
                  <p>Сума (3 позиції)</p>
                  <p>1050 грн</p>
                </div>
                <div>
                  <p>Знижка</p>
                  <p>150 грн</p>
                </div>
              </div>
              <div className={s.total}>
                <p>Загальна сума</p>
                <p>900 грн</p>
              </div>
            </div>
            <button className={s.btn} onClick={() => nextStep()}>
              Далі
            </button>
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
      </section>
    </>
  )
}

export default СheckoutCard
