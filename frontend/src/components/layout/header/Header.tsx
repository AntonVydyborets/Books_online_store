import { FC } from 'react'
import { Link } from 'react-router'

import logo from '@/assets/images/logo.png'
import account_icon from '@/assets/images/account.svg'
import wishlist_icon from '@/assets/images/wishlist.svg'
import trash_icon from '@/assets/images/trash.svg'

import Container from '@/shared/container/Container.tsx'
import VerticalMenu from '@/shared/verticalMenu/VerticalMenu.tsx'

import BaseInput from '@/ui/baseInput/BaseInput.tsx'

import s from './Header.module.scss'
import burger_menu from '@/assets/images/b_menu.svg'

interface HeaderProps {
  isMenuOpen?: boolean
}

const Header: FC<HeaderProps> = ({ isMenuOpen }) => {
  return (
    <>
      <div className={s.header}>
        <Container>
          <div className={s.header_top}>
            <div className="header_top__logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className={s.header_top__search}>
              <BaseInput type="text" placeholder="Пошук" />
            </div>
            <div className={s.header_top__right_menu}>
              <div className={s.header_top__right_menu__lang}>
                <div>UA</div>
                <span>|</span>
                <div>EN</div>
              </div>
              <div className={s.header_top__right_menu__tel}>
                <div>0 800 675 67 93</div>
              </div>
              <div className={s.header_top__right_menu__tools}>
                <div>
                  <img src={account_icon} alt="my-account" />
                </div>
                <div>
                  <img src={wishlist_icon} alt="wishlist" />
                </div>
                <div>
                  <img src={trash_icon} alt="trash" />
                </div>
              </div>
            </div>
          </div>
        </Container>
        <div className={s.header_bottom}>
          <Container className={s.header_bottom__container}>
            <VerticalMenu isMenuOpen={isMenuOpen} />
            <div className="header_bottom__menu">
              <ul className={s.header_bottom__menu__main}>
                <li>
                  <Link to="/">Головна</Link>
                </li>
                <li>
                  <Link to="/shop">Магазин</Link>
                </li>
              </ul>
            </div>
          </Container>
        </div>
      </div>
      <div className={s.mobile_header}>
        <Container>
          <div className={s.mobile_header__inner}>
            <div className={s.burger_menu}>
              <img src={burger_menu} alt="burger" />
            </div>
            <div className={s.mobile_header__logo}>
              <Link to="/" className={s.mobile_header__logo__link}>
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className={s.mobile_header__tools}>
              <div>
                <img src={account_icon} alt="my-account" />
              </div>
              <div>
                <img src={wishlist_icon} alt="wishlist" />
              </div>
              <div>
                <img src={trash_icon} alt="trash" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Header
