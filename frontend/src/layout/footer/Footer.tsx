import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Container } from '@/shared'
import facebook from '@/assets/images/facebook.svg'
import instagram from '@/assets/images/instagram.svg'
import telegram from '@/assets/images/telegram.svg'
import logo from '@/assets/images/header/main_logo.svg'
import styles from './Footer.module.scss'

type FormValue = {
  email: string
}

const Footer = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormValue>()
  
    const onSubmit: SubmitHandler<FormValue> = (value) => {
      console.log('Form Submitted:', value)
    }
  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <div className={styles.first}>
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="logo" />
          </Link>
          <p className={styles.address}>м. Київ, вул. Книжкова, 12</p>
          <a className={styles.phone} href="tel:+380441234567">
            +380 (44) 123-45-67
          </a>
          <a className={styles.email} href="mailto:info@chytanniabezmezh.ua">info@chytanniabezmezh.ua</a>
        </div>
        <div className={styles.second}>
          <ul>
            <li>
              <Link to="/shop">Каталог</Link>
            </li>
            <li>
              <Link to="/">E-books</Link>
            </li>
            <li>
              <Link to="/">Блог</Link>
            </li>
            <li>
              <Link to="/">FAQ</Link>
            </li>
          </ul>
        </div>
        <div className={styles.third}>
          <ul>
            <li>
              <Link to="/">Про нас</Link>
            </li>
            <li>
              <Link to="/">Для клієнтів</Link>
            </li>
            <li>
              <Link to="/">Для видавців</Link>
            </li>
            <li>
              <Link to="/">Юридична інформація</Link>
            </li>
          </ul>
        </div>
        <div className={styles.fouth}>
          <p className={styles.subtitle}>Будьте в курсі новин</p>
          <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
          <label>
            <input
              id="email"
              className={styles.input}
              type="email"
              placeholder="Введіть свій email, щоб отримувати новини"
              {...register('email', { required: 'Введіть свій email', pattern: /^\S+@\S+\.\S+$/ })}
            />
          </label>
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
          <button className={styles['btn-subscribe']}>Підписатись</button>
        </form>
          <div className={styles['social-wrap']}>
            <a href="/frontend/public">
              <img src={telegram} alt="telegram" />
            </a>
            <a href="/frontend/public">
              <img src={facebook} alt="facebook" />
            </a>
            <a href="/frontend/public">
              <img src={instagram} alt="instagram" />
            </a>
            <button className={styles['connect-to-us']}>
            Зв'язатися з нами 
            </button>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
