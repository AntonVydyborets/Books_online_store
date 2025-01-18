import s from '@/pages/cart/Cart.module.scss'

function ThirdStep() {
  return (
    <div className={s.third}>
      <h5>Ви успішно створили замовлення</h5>
      <div className={s.grid}>
        <p className={s.title}>Доставка</p>
        <div className={s.desc}>
          <p>Новою Поштою</p>
          <p>Відділення №25 - вул. Тараса Шевченка, 138</p>
        </div>
      </div>
      <div className={s.grid}>
        <p className={s.title}>Оплата</p>
        <p className={s.desc}>Післяплата</p>
      </div>
      <p className={s.result}>Ми відправили деталі Вашого замовлення на email</p>
    </div>
  )
}

export default ThirdStep
