import { Container } from '@/shared'
import storeIcon from '@/assets/images/store-icon.svg'
import booksIcon from '@/assets/images/books-icon.svg'
import peopleIcon from '@/assets/images/people-icon.svg'
import s from './Achievements.module.scss'

function Achievements() {
  return (
    <Container className={s.container}>
      <div className={s.wrap}>
        <div className={s.shop}>
          <img src={storeIcon} alt="store" />
          <div className={s['inner-wrap']}>
            <p className={s.number}>7</p>
            <p>років працюємо</p>
          </div>
        </div>
        <div className={s.shop}>
          <img src={booksIcon} alt="books" />
          <div className={s['inner-wrap']}>
            <p className={s.number}>38 К</p>
            <p>книг продано</p>
          </div>
        </div>
        <div className={s.shop}>
          <img src={peopleIcon} alt="people" />
          <div className={s['inner-wrap']}>
            <p className={s.number}>22 К</p>
            <p>клієнтів обслуговано</p>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Achievements
