import burger from '@/assets/images/burger.svg'
import star_icon from '@/assets/images/Star.svg'
import right_arrow from '@/assets/images/chevron-right.svg'

import s from './VerticalMenu.module.scss'

const VerticalMenu = () => {
  return (
    <div className={s.verticalNavigation}>
      <div className={s.verticalNavigation__burger}>
        <img src={burger} alt="burger" />
      </div>
      <div className={s.verticalNavigation__title}>Каталог</div>
      <div className={s.verticalNavigation__additionalContent}>
        <ul className="additionalContent__menu">
          <li className={s.additionalContent__menu__item}>
            <a className={s.additionalContent__menu__item__link} href="#">
              <div className={s.starIcon}>
                <img src={star_icon} alt="star-icon" />
              </div>
              <span className={s.menu__item__link__text}>Паперові книги</span>
              <div>
                <img className="arrowIcon" src={right_arrow} alt="right-arrow" />
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default VerticalMenu
