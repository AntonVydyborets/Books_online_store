import logo from '../../assets/images/logo.png'

import s from './Header.module.scss'

const Header = () => {
  return (
    <div>
      <div className="header_top">
        <div className="header_top__logo"></div>
        <div className="header_top__search"></div>
        <div className="header_top__right_menu"></div>
      </div>
      <div className="header_bottom">
        <div className="verticalNavigation">
          <div className="burger">
            <img src={logo} alt="logo" />
          </div>
          <div>Каталог</div>
        </div>
        <div className="header_bottom__menu">
          <ul>
            <li>Про нас</li>
            <li>Знижки</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
