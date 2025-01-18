import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import s from './СheckoutCard.module.scss'

interface FormValues {
  firstName: string
  lastName: string
  tel: string
  delivery_new_post: 'Самовивіз' | 'Доставка Новою Поштою' | "Кур'єрська доставка"
  payment: 'Онлайн оплата' | 'Післяплата'
  city: string
}

const defaultValue: FormValues = {
  firstName: '',
  lastName: '',
  tel: '',
  delivery_new_post: 'Самовивіз',
  payment: 'Післяплата',
  city: '',
}

const schemaСheckoutCard = yup.object({
  firstName: yup.string().required('Please enter your first name'),
  lastName: yup.string().required('Please enter your last name'),
  tel: yup.string().required('Please enter your tel'),
  delivery_new_post: yup
    .string()
    .required()
    .oneOf(['Самовивіз', 'Доставка Новою Поштою', "Кур'єрська доставка"], 'Оберіть метод доставки'),
  payment: yup.string().required().oneOf(['Онлайн оплата', 'Післяплата'], 'Оберіть метод оплати'),
  city: yup.string().required('Please enter your city'),
})

const SecondStep = (props: { nextStep: unknown }) => {
  const { nextStep } = props
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormValues>({
    defaultValues: {
      ...defaultValue,
    },
    mode: 'onTouched',
    resolver: yupResolver(schemaСheckoutCard),
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
            <span>Введіть Ваше ім’я*</span>
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
            <span>Введіть Ваше прізвище*</span>
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
            <span>Введіть Ваше номер телефону*</span>
            <input type="tel" placeholder="+38" {...register('tel', { required: true })} />
            <span className={s['sub-label']}>введіть Ваш номер у форматі +380</span>
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
        <h5>Оберіть метод доставки</h5>
        <div className={s.radio}>
          <label>
            <input value="Самовивіз" type="radio" {...register('delivery_new_post')} />
            <span>Самовивіз</span>
          </label>
          <label>
            <input value="Доставка Новою Поштою" type="radio" {...register('delivery_new_post')} />
            <span>Доставка Новою Поштою</span>
          </label>
          <label>
            <input value="Кур'єрська доставка" type="radio" {...register('delivery_new_post')} />
            <span>Кур'єрська доставка</span>
          </label>
        </div>
      </div>
      <div className={s.payment}>
        <h5>Оберіть метод оплати</h5>
        <div className={s.radio}>
          <label>
            <input value="Онлайн оплата" type="radio" {...register('payment')} />
            <span>Онлайн оплата</span>
          </label>
          <label>
            <input value="Післяплата" type="radio" {...register('payment')} />
            <span>Післяплата</span>
          </label>
          <span className={s['sub-label']}>оплата замовлення при отриманні</span>
        </div>
      </div>
      <button type="submit" className={s.submit}>
        Підтвердити
      </button>
      {/* <BaseButton type="submit" className={s.submit}>Підтвердити</BaseButton> */}
    </form>
  )
}

export default SecondStep
