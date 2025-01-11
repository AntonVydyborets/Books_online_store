import { useState } from 'react'
import { Link } from 'react-router'

import logo from '@/assets/images/header/main_logo.svg'
import account_icon from '@/assets/images/header/language.svg'
import wishlist_icon from '@/assets/images/header/user.svg'
import trash_icon from '@/assets/images/header/bag-2.svg'
import burger_menu from '@/assets/images/b_menu.svg'

import { Container } from '@/shared'

import { BaseInput, Typography } from '@/ui'

import s from './Header.module.scss'

const Header = () => {
  const [searchBook, setSearchBook] = useState('')

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

            <div className={s.verticalNavigation}>
              <div className={s.verticalNavigation__title}>Каталог</div>
              <div className={s.mega_menu__content}>
                <div className={s.mega_menu__contnet__item}>
                  <Typography tag="h4">Genres</Typography>
                  <ul>
                    <li>Fiction</li>
                    <li>Non-Fiction</li>
                    <li>Educational</li>
                    <li>Children's </li>
                  </ul>
                </div>

                <div className={s.mega_menu__contnet__item}>
                  <Typography tag="h4">Gift offers</Typography>
                  <ul>
                    <li>Gift Certificates</li>
                    <li>Gifts for kids</li>
                    <li>Packed Sets</li>
                    <li>For women</li>
                    <li>For men</li>
                  </ul>
                </div>

                <ul className={s.mega_menu__contnet__main}>
                  <li>
                    <Link to="/shop">Shop</Link>
                  </li>
                  <li>
                    <Link to="/shop">Books of the year</Link>
                  </li>
                  <li>
                    <Link to="/shop">New comings</Link>
                  </li>
                  <li>
                    <Link to="/shop">Blog</Link>
                  </li>
                  <li>
                    <Link to="/shop">Telegram book club</Link>
                  </li>
                  <li>
                    <Link to="/shop">Free shipping program</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className={s.header_top__search}>
              <BaseInput
                type="text"
                placeholder="Введіть назву книги, автора або категорії"
                value={searchBook}
                onChange={(e) => {
                  setSearchBook(e.currentTarget.value)
                }}
              />
            </div>

            <div className={s.header_top__right_menu}>
              <div className={s.header_top__right_menu__tools}>
                <div>
                  <img src={account_icon} alt="my-account" />
                </div>
                <div>
                  <img src={wishlist_icon} alt="wishlist" />
                </div>
                <Link to="/checkout">
                  <img src={trash_icon} alt="trash" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
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
