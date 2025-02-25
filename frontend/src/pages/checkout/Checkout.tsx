import { Footer, Header } from '@/components'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { CircleProgress, Container } from '@/shared'

import { useOrdersStore } from '@/store/useOrdersStore'

import { useMutation } from '@tanstack/react-query'
import { setOrderInformation } from '@/services/api'
import DeliverBanner from '@/assets/images/delivery-banner.png'
import s from './Checkout.module.scss'

interface FormValues {
  firstName: string
  lastName: string
  tel: string
  delivery_new_post: 'Самовивіз' | 'Доставка Новою Поштою' | "Кур'єрська доставка"
  payment: 'Онлайн оплата' | 'Післяплата'
  city: string
  shippingAddress?: string
  comment?: string
}

const defaultValue: FormValues = {
  firstName: '',
  lastName: '',
  tel: '',
  delivery_new_post: 'Самовивіз',
  payment: 'Післяплата',
  city: '',
  shippingAddress: '1',
  comment: '',
}

const schemaСheckoutCard = yup.object({
  firstName: yup.string().required('Обовʼязкове для заповнення'),
  lastName: yup.string().required('Обовʼязкове для заповнення'),
  tel: yup
    .string()
    .required('Обовʼязкове для заповнення')
    .matches(/^380\d{9}$/, 'Введіть номер у форматі 380XXXXXXXXX'),
  delivery_new_post: yup
    .string()
    .required()
    .oneOf(['Самовивіз', 'Доставка Новою Поштою', "Кур'єрська доставка"] as const, 'Оберіть метод доставки'),
  payment: yup
    .string()
    .required()
    .oneOf(['Онлайн оплата', 'Післяплата'] as const, 'Оберіть метод оплати'),
  city: yup.string().required('Виберіть із списку'),
  shippingAddress: yup.string().required('Виберіть із списку'),
})

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: defaultValue,
    mode: 'onTouched',
    resolver: yupResolver(schemaСheckoutCard) as Resolver<FormValues>,
  })

  const { totalPrice, orderInfo } = useOrdersStore((state) => state)

  const mutation = useMutation({
    mutationFn: setOrderInformation,
  })

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    const orderPayload = {
      total_price: totalPrice,
      status: 'pending',
      email: '',
      phone: values.tel,
      items: orderInfo,
    }

    mutation.mutate(orderPayload)
  }

  if (mutation.status === 'pending') return <CircleProgress />

  return (
    <>
      <Header />
      <Container>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.customer}>
            <h5>Введіть Ваші персональні дані</h5>
            <div className={s.wrap}>
              <label>
                <span>Ім’я*</span>
                <input type="text" placeholder="Ім’я" {...register('firstName')} />

                {errors.firstName && <span className={s.error}>{errors.firstName.message}</span>}
              </label>
              <label>
                <span>Прізвище*</span>
                <input type="text" placeholder="Прізвище" {...register('lastName')} />

                {errors.lastName && <span className={s.error}>{errors.lastName.message}</span>}
              </label>
              <label>
                <span>Номер телефону*</span>
                <input type="tel" placeholder="+38" {...register('tel')} />
                <span className={s['sub-label']}>У форматі 380</span>

                {errors.tel && <span className={s.error}>{errors.tel.message}</span>}
              </label>
              <label>
                <span>Місто*</span>
                <select {...register('city')}>
                  <option value="Kyiv">Kyiv</option>
                  <option value="Lviv">Lviv</option>
                  <option value="Kremenchyk">Kremenchyk</option>
                </select>
                {errors.city && <span className={s.error}>{errors.city.message}</span>}
              </label>
            </div>
          </div>
          <div className={s.shipping}>
            <h5>Оберіть спосіб доставки</h5>
            <div className={s.radio}>
              <label>
                <input type="radio" value="Самовивіз" {...register('delivery_new_post')} />
                <span>Самовивіз</span>
              </label>
              <label>
                <input type="radio" value="Доставка Новою Поштою" {...register('delivery_new_post')} />
                <span>Доставка Новою Поштою</span>
              </label>
              <label className={s['shipping_address']}>
                <span>Оберіть відділення*</span>
                <select {...register('shippingAddress')}>
                  <option value="1">Відділення 1</option>
                  <option value="2">Відділення 2</option>
                  <option value="3">Відділення 3</option>
                </select>
                <span>Почніть вводити номер або адресу та оберіть варіант зі списку</span>
                {errors.city && <span className={s.error}>{errors.city.message}</span>}
              </label>
              <label>
                <input type="radio" value="Кур'єрська доставка" {...register('delivery_new_post')} />
                <span>Кур'єрська доставка</span>
              </label>
            </div>
          </div>
          <div className={s.payment}>
            <h5>Оберіть спосіб оплати</h5>
            <div className={s.radio}>
              <label>
                <input type="radio" value="Післяплата" {...register('payment')} />
                <span>Післяплата</span>
              </label>
            </div>
          </div>
          <div className={s.textarea}>
            <h5>Залиште коментар (за потреби)</h5>
            <p>Додайте побажання або уточнення до вашого замовлення</p>
            <textarea rows={3} value="" {...register('comment')}></textarea>
          </div>
          <button className={s.submit} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Відправка...' : 'Підтвердити замовлення'}
          </button>

          {mutation.isError && <p className={s.error}>An error occurred: {mutation.error.message}</p>}
          {mutation.isSuccess && <p>Order placed successfully!</p>}
        </form>
      </Container>
      <Container>
        <div className={s.bottom}>
          <img src={DeliverBanner} alt="icons-free-deliver" />
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default Checkout
