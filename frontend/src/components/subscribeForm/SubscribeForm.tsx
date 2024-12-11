import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import styles from './SubscribeForm.module.scss'

type FormValue = {
  email: string
}

const SubscribeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>()

  const onSubmit: SubmitHandler<FormValue> = (value) => {
    console.log('Form Submitted:', value)
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p className={styles.subtitle}>Newsletter</p>
        <p className={styles.text}>Sign up for our newsletter to get the latest updates and special offers!</p>
      </div>
      <div className={styles.right}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['input-wrap']}>
            <input
              className={styles.input}
              type="email"
              placeholder="Email address"
              {...register('email', { required: 'This field is required', pattern: /^\S+@\S+\.\S+$/ })}
            />
            {errors.email && <span className={styles.error}>{errors.email.message}</span>}
          </div>

          <button className={styles['btn-subscribe']}>Subscribe</button>
        </form>
      </div>
    </div>
  )
}

export default SubscribeForm