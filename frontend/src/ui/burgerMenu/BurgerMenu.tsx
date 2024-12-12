import burger_menu from '@/assets/images/b_menu.svg'

import s from './BurgerMenu.module.scss'

const BurgerMenu = () => {
  return (
    <div className={s.burger_menu}>
      <img src={burger_menu} alt="burger" />
    </div>
  )
}

export default BurgerMenu
