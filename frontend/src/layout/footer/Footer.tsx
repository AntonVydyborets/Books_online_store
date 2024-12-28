import { Link } from 'react-router-dom'
import facebook from '@/assets/images/facebook.svg'
import instagram from '@/assets/images/instagram.svg'
import twitter from '@/assets/images/twitter.svg'
import styles from './Footer.module.scss'

const Footer = () => {
  const getYear = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div>
          <a className={styles.phone} href="tel:657-38-48">
            657-38-48
          </a>
          <p className={styles.address}>вул. Шевченко 23</p>
          <div className={styles['work_schedule']}>
            <p>Графік роботи:</p>
            <p>9.00 - 18.00</p>
            <p>Без вихідних</p>
          </div>
          <p className={styles.email}>shevchenko@gmail.com</p>
          <div className={styles['social-wrap']}>
            <a href="/frontend/public">
              <img src={facebook} alt="facebook" />
            </a>
            <a href="/frontend/public">
              <img src={instagram} alt="instagram" />
            </a>
            <a href="/frontend/public">
              <img src={twitter} alt="twitter" />
            </a>
          </div>
        </div>
        <div>
          <p className={styles.subtitle}>Покупцям</p>
          <ul>
            <li>
              <Link to="/">Fiction</Link>
            </li>
            <li>
              <Link to="/">Non-Fiction</Link>
            </li>
            <li>
              <Link to="/">Science Fiction</Link>
            </li>
            <li>
              <Link to="/">Fantasy</Link>
            </li>
            <li>
              <Link to="/">Romance</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className={styles.subtitle}>Інформація</p>
          <ul>
            <li>
              <Link to="/">Book Clubs</Link>
            </li>
            <li>
              <Link to="/">Author Interviews</Link>
            </li>
            <li>
              <Link to="/">Reading Lists</Link>
            </li>
            <li>
              <Link to="/">Literary Events</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className={styles.subtitle}>Категорії</p>
          <ul>
            <li>
              <Link to="/">Our Team</Link>
            </li>
            <li>
              <Link to="/">Careers</Link>
            </li>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>{getYear}</p>
        <p>“Читання без меж”</p>
        <p>Всі права захищені.</p>
      </div>
    </footer>
  )
}

export default Footer
