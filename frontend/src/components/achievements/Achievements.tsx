import { Link } from 'react-router-dom'
import logo from '@/assets/images/logo.png'
import s from './Achievements.module.scss'

function Achievements() {
  return (
    <div className={s.container}>
      <div className={s.wrap}>
        <div className={s.logo}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className={s.shop}>
          <img src='https://openclipart.org/image/800px/275692' alt="shop" />
          <div className={s['inner-wrap']}>
            <p className={s.number}>7</p>
            <p>Years working</p>
          </div>
        </div>
        <div className={s.shop}>
          <img src='https://openclipart.org/image/800px/275692' alt="shop" />
          <div className={s['inner-wrap']}>
            <p className={s.number}>38 K</p>
            <p>Books sold</p>
          </div>
        </div>
        <div className={s.shop}>
          <img src='https://openclipart.org/image/800px/275692' alt="shop" />
          <div className={s['inner-wrap']}>
            <p className={s.number}>22 K</p>
            <p>Customers served</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Achievements
