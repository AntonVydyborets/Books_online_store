import { Container } from '@/shared'
import storeIcon from '@/assets/images/one.png'
import booksIcon from '@/assets/images/two.png'
import yearIcon from '@/assets/images/three.png'
import lampIcon from '@/assets/images/four.png'
import s from './Achievements.module.scss'

function Achievements() {
  return (
    <div className={s.container}>
      <Container>
        <div className={s.wrap}>
          <div className={s.shop}>
            <img src={storeIcon} alt="store" />
            <div className={s['inner-wrap']}>
              <p className={s.number}>20 000</p>
              <p className={s.text}>ВИБІР ЧИТАЧІВ</p>
            </div>
          </div>
          <div className={s.shop}>
            <img src={booksIcon} alt="store" />
            <div className={s['inner-wrap']}>
              <p className={s.number}>75 000</p>
              <p className={s.text}>ПРОДАНО КНИГ</p>
            </div>
          </div>
          <div className={s.shop}>
            <img src={yearIcon} alt="books" />
            <div className={s['inner-wrap']}>
              <p className={s.number}>3 роки</p>
              <p className={s.text}>МИ ПРАЦЮЄМО</p>
            </div>
          </div>
          <div className={s.shop}>
            <img src={lampIcon} alt="people" />
            <div className={s['inner-wrap']}>
              <p className={s.number}>5 000</p>
              <p className={s.text}>АВТОРІВ СВІТУ</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Achievements
