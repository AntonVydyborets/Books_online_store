import React, { useEffect } from 'react'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import s from '@/pages/cart/Cart.module.scss'

interface FormValues {
  firstName: string
  lastName: string
  tel: string
  delivery_new_post: 'Самовивіз' | 'Доставка Новою Поштою' | "Кур'єрська доставка"
  payment: 'Післяплата'
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
  tel: yup.string().required('Обовʼязкове для заповнення'),
  delivery_new_post: yup
    .string()
    .required()
    .oneOf(['Самовивіз', 'Доставка Новою Поштою', "Кур'єрська доставка"] as const, 'Оберіть метод доставки'),
  payment: yup
    .string()
    .required()
    .oneOf(['Післяплата'] as const, 'Оберіть метод оплати'),
  city: yup.string().required('Виберіть із списку'),
  shippingAddress: yup.string(),
})

type SecondStepProps = {
  nextStep: () => void
}
const SecondStep: React.FC<SecondStepProps> = ({ nextStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormValues>({
    defaultValues: {
      ...defaultValue,
    },
    mode: 'onTouched',
    resolver: yupResolver(schemaСheckoutCard) as Resolver<FormValues>,
  })
  const onSubmit: SubmitHandler<FormValues> = (v) => {
    console.log('handleSubmit >>>> ', v)
  }
  useEffect(() => {
    if (isSubmitSuccessful) {
      nextStep()
    }
  }, [isSubmitSuccessful])

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.customer}>
        <h5>Введіть Ваші персональні дані</h5>
        <div className={s.wrap}>
          <label>
            <span>Ім’я*</span>
            <input
              type="text"
              placeholder="Введіть ваше ім’я"
              {...register('firstName', { required: true, maxLength: 120 })}
            />
            {errors.firstName && errors.firstName.type === 'required' && (
              <span className={s.error}>{errors.firstName?.message || 'Error'}</span>
            )}
          </label>
          <label>
            <span>Прізвище*</span>
            <input
              type="text"
              placeholder="Введіть ваше прізвище"
              {...register('lastName', { required: true, maxLength: 120 })}
            />
            {errors.lastName && errors.lastName.type === 'required' && (
              <span className={s.error}>{errors.lastName?.message || 'Error'}</span>
            )}
          </label>
          <label>
            <span>Номер телефону*</span>
            <input type="tel" placeholder="38" {...register('tel', { required: true })} />
            <span className={s['sub-label']}>У форматі 380</span>
            {errors.tel && <span className={s.error}>{errors.tel?.message || 'Error'}</span>}
          </label>
          <label>
            <span>Місто*</span>
            <select defaultValue="Kyiv" {...register('city', { required: true })}>
              <option value="Kyiv">Київ</option>
              <option value="Lviv">Львів</option>
              <option value="Kremenchyk">Кременчук</option>
            </select>
            <span className={s['sub-label']}>почніть вводити перші літери міста та виберіть варіант зі списку</span>
          </label>
        </div>
      </div>
      <div className={s.shipping}>
        <h5>Оберіть спосіб доставки</h5>
        <div className={s.radio}>
          <label>
            <input value="Самовивіз" type="radio" {...register('delivery_new_post')} />
            <span>Самовивіз</span>
          </label>
          <label>
            <input value="Доставка Новою Поштою" type="radio" {...register('delivery_new_post')} />
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
            <input value="Кур'єрська доставка" type="radio" {...register('delivery_new_post')} />
            <span>Кур'єрська доставка</span>
          </label>
        </div>
      </div>
      <div className={s.payment}>
        <h5>Оберіть спосіб оплати</h5>
        <div className={s.radio}>
          <label>
            <input value="Післяплата" type="radio" {...register('payment')} />
            <span>Післяплата</span>
          </label>
        </div>
      </div>
          <div className={s.textarea}>
            <h5>Залиште коментар (за потреби)</h5>
            <p>Додайте побажання або уточнення до вашого замовлення</p>
            <textarea rows={3} value="" {...register('comment')}></textarea>
          </div>
      <button type="submit" className={s.submit}>
        Підтвердити
      </button>
      {/* <BaseButton type="submit" className={s.submit}>Підтвердити</BaseButton> */}
    </form>
  )
}

export default SecondStep
