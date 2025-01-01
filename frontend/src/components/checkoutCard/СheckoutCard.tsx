import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { FC, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import EditOrderPopup from '@/components/editOrderPopup/EditOrderPopup'
import { OrderType } from '@/utils/types/OrderType'
import s from './СheckoutCard.module.scss'

const schemaСheckoutCard = yup.object({
  firstName: yup.string().required('Please enter your first name'),
  lastName: yup.string().required('Please enter your last name'),
  tel: yup.string().required('Please enter your tel'),
  delivery_new_post: yup.string().required().oneOf(['0', '1', '2'], 'Оберіть метод доставки'),
  payment: yup.string().required().oneOf(['1', '2'], 'Оберіть метод оплати'),
  wareHouse: yup.string().required('Please enter your ware house'),
  city: yup.string().required('Please enter your city'),
})
interface FormValues {
  firstName: string
  lastName: string
  tel: string
  delivery_new_post: '0' | '1' | '2'
  payment: '1' | '2'
  wareHouse: string
  city: string
}
const defaultValue: FormValues = {
  firstName: '',
  lastName: '',
  tel: '',
  delivery_new_post: '1',
  payment: '1',
  wareHouse: '',
  city: '',
}

const СheckoutCard: FC<OrderType> = ({ data }) => {
  console.log('props', data.orderItems)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitted, isSubmitSuccessful, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      ...defaultValue,
    },
    mode: 'onTouched',
    resolver: yupResolver<typeof defaultValue>(schemaСheckoutCard),
  })

  const [edit, setEdit] = useState<boolean>(false)

  const onSubmit: SubmitHandler<FormValues> = (v) => {
    console.log('handleSubmit >>>> ', v)
  }
  const handle = () => {
    setEdit(!edit)
  }
  return (
    <>
      <section className={s.container}>
        {edit && <EditOrderPopup order={data.orderItems} toggleModal={handle} />}
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.left}>
            <div className={s.customer}>
              <h5>Введіть Ваші персональні дані</h5>
              <div className={s.wrap}>
                <label>
                  <span>Введіть Ваше ім’я*</span>
                  <input type="text" placeholder="Введіть ваше ім’я" {...register('firstName')} />
                  {errors.firstName && errors.firstName.type === 'required' && (
                    <span className={s.error}>{errors.firstName?.message || 'Error'}</span>
                  )}
                </label>
                <label>
                  <span>Введіть Ваше прізвище*</span>
                  <input type="text" placeholder="Введіть ваше прізвище" {...register('lastName')} />
                  {errors.lastName && errors.lastName.type === 'required' && (
                    <span className={s.error}>{errors.lastName?.message || 'Error'}</span>
                  )}
                </label>
                <label>
                  <span>Введіть Ваше номер телефону*</span>
                  <input type="tel" placeholder="+38" {...register('tel')} />
                  {errors.tel && <span className={s.error}>{errors.tel?.message || 'Error'}</span>}
                </label>
                <label>
                  <span>Місто*</span>
                  <select name="city" defaultValue="Kyiv">
                    <option value="Kyiv">Kyiv</option>
                    <option value="Lviv">Lviv</option>
                    <option value="Kremenchyk">Kremenchyk</option>
                  </select>
                </label>
              </div>
            </div>
            <div className={s.shipping}>
              <h5>Оберіть метод доставки</h5>
              <div className={s.checkbox}>
                <label>
                  <input value="0" type="radio" {...register('delivery_new_post')} />
                  <span>Самовивіз</span>
                </label>
                <label>
                  <input value="1" type="radio" {...register('delivery_new_post')} />
                  <span>Доставка Новою Поштою</span>
                </label>
              </div>
              <label className={s.wareHouse}>
                <span>Оберіть відділення</span>
                <select name="wareHouse" defaultValue="Відділення 1">
                  <option value="Відділення 1">Відділення 1</option>
                  <option value="Відділення 2">Відділення 2</option>
                  <option value="Відділення 3">Відділення 3</option>
                </select>
              </label>
              <div className={s.checkbox}>
                <label>
                  <input value="2" type="radio" {...register('delivery_new_post')} />
                  <span>Кур'єрська доставка</span>
                </label>
              </div>
            </div>
            <div className={s.payment}>
              <h5>Оберіть метод оплати</h5>
              <div className={s.checkbox}>
                <label>
                  <input value="1" type="radio" {...register('payment')} />
                  <span>Онлайн оплата</span>
                </label>
                <label>
                  <input value="2" type="radio" {...register('payment')} />
                  <span>Післяплата</span>
                </label>
              </div>
            </div>
          </div>
          <div className={s.right}>
            <div className={s.order}>
              <h3>Замовлення</h3>
              {data.orderItems.map(({ book }) => (
                <div key={book.id} className={s['order-book']}>
                  <div className={s.cover}>
                    <img src={book.cover} alt={book.title} />
                  </div>
                  <div className={s.info}>
                    <p className={s.title}>{book.title}</p>
                    <p className={s.author}>{book.author}</p>
                  </div>
                </div>
              ))}
              <div>
                <p>1 товар у кошику</p>
                <p className={s.edit} onClick={handle}>
                  Edit
                </p>
              </div>
              <div>
                <p>Разом 350 грн</p>
              </div>
            </div>
            <div className={s.pay}>
              <div>
                <p className={s.promocod}>Промокод</p>
                <Link to="/" className={s.continue}>
                  Продовжити покупки
                </Link>
              </div>
              <div>
                <p>Загальна сума</p>
                <p>350 грн</p>
              </div>
            </div>
          </div>
          <button type="submit" className={s.submit} disabled={!isDirty || !isValid || isSubmitting}>
            Підтвердити
          </button>
        </form>
      </section>
    </>
  )
}

export default СheckoutCard
