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
  email: yup.string().email().required('Please enter your email'),
  legalEntity: yup.boolean(),
  anotherPerson: yup.boolean(),
  comment: yup.string(),
  callback: yup.boolean(),
})
interface FormValues {
  firstName: string
  lastName: string
  tel: string
  email: string
  legalEntity: boolean
  anotherPerson?: boolean
  country?: string
  city?: string
  comment?: string
  callback: boolean
}
const defaultValue: FormValues = {
  firstName: '',
  lastName: '',
  tel: '',
  email: '',
  legalEntity: true,
  anotherPerson: false,
  country: '',
  city: '',
  comment: '',
  callback: false,
}

const СheckoutCard: FC<OrderType> = ({ data }) => {
  console.log('props', data.orderItems)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitted, isSubmitSuccessful, isSubmitting },
  } = useForm<FormValues>({ defaultValue: {
    firstName: '',
    lastName: '',
    tel: '',
    email: '',
    legalEntity: true,
    anotherPerson: false,
    country: '',
    city: '',
    comment: '',
    callback: false,
  }, mode: 'onTouched', resolver: yupResolver<yup.AnyObject>(schemaСheckoutCard) })
  
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
        <h1>Оформлення замовлення</h1>
        {edit && <EditOrderPopup order={data.orderItems} toggleModal={handle} />}
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.left}>
            <div className={s.customer}>
              <h5>Контактні дані</h5>
              <div className={s.wrap}>
                <label>
                  <span>Ім’я*</span>
                  <input type="text" placeholder="Введіть ваше ім’я" {...register('firstName')} />
                  {errors.firstName && errors.firstName.type === 'required' && (
                    <span className={s.error}>{errors.firstName?.message || 'Error'}</span>
                  )}
                </label>
                <label>
                  <span>Прізвище*</span>
                  <input type="text" placeholder="Введіть ваше прізвище" {...register('lastName')} />
                  {errors.lastName && errors.lastName.type === 'required' && (
                    <span className={s.error}>{errors.lastName?.message || 'Error'}</span>
                  )}
                </label>
                <label>
                  <span>Номер телефону*</span>
                  <input type="tel" placeholder="+38" {...register('tel')} />
                  {errors.tel && <span className={s.error}>{errors.tel?.message || 'Error'}</span>}
                </label>
                <label>
                  <span>Електронна пошта*</span>
                  <input type="email" placeholder="Введіть ваш email" {...register('email')} />
                  {errors.email && errors.email.type === 'required' && (
                    <span className={s.error}>{errors.email?.message || 'Error'}</span>
                  )}
                </label>
                <div className={s.checkbox}>
                  <label>
                    <input type="checkbox" {...register('legalEntity')} />
                    <span>Оформити як юридична особа</span>
                  </label>
                  <label>
                    <input type="checkbox" {...register('anotherPerson')} />
                    <span>Отримувач інша людина</span>
                  </label>
                </div>
              </div>
            </div>
            <div className={s.shipping}>
              <h5>Доставка</h5>
              <div className={s.wrap}>
                <label>
                  <span>Країна*</span>
                  <select name="country" defaultValue="Ukraine">
                    <option value="Ukraine">Ukraine</option>
                    <option value="United States">United States</option>
                    <option value="Great Britain">Great Britain</option>
                  </select>
                </label>
                <label>
                  <span>Місто*</span>
                  <select name="city" defaultValue="Kremenchyk">
                    <option value="Kyiv">Kyiv</option>
                    <option value="Lviv">Lviv</option>
                    <option value="Kremenchyk">Kremenchyk</option>
                  </select>
                </label>
                <div className={s.checkbox}>
                  <label>
                    <input type="checkbox" {...register} />
                    <span>Оформити як юридична особа</span>
                  </label>
                  <label>
                    <input type="checkbox" {...register} />
                    <span>Отримувач інша людина</span>
                  </label>
                </div>
              </div>
            </div>
            <div className={s.comment}>
              <h5>Коментар до замовлення</h5>
              <textarea autoComplete="off" {...register('comment')}></textarea>
            </div>
          </div>
          <div className={s.right}>
            <div className={s.order}>
              <div>
                <p>1 товар у кошику</p>
                <p className={s.edit} onClick={handle}>
                  Edit
                </p>
              </div>
              {data.orderItems.map(({ book }) => (
                <div key={book.id} className={s['order-book']}>
                  <div className={s.cover}>
                    <img src={book.cover} alt={book.title} />
                  </div>
                  <div className={s.info}>
                    <p className={s.title}>{book.title}</p>
                    <p className={s.genre}>{book.genre}</p>
                    <p className={s.price}>{book.price} грн.</p>
                    <p className={s.stock}>{book.stock ? 'В наявності' : 'Продано'}</p>
                  </div>
                </div>
              ))}
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
                <p>До сплати</p>
                <p>350 грн</p>
              </div>
              <div>
                <label className={s.callback}>
                  <input type="checkbox" {...register('callback')} />
                  <span>Передзвоніть мені</span>
                </label>
                <button type="submit" className={s.submit}>
                  {/* disabled={!isDirty || !isValid || isSubmitting} */}
                  Підтвердити замовлення
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default СheckoutCard
