import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

import logo from '@/assets/images/header/main_logo.svg'
import account_icon from '@/assets/images/header/language.svg'
import wishlist_icon from '@/assets/images/header/user.svg'
import cart_icon from '@/assets/images/header/bag-2.svg'
import burger_menu from '@/assets/images/b_menu.svg'
import search_icon from '../../assets/images/header/search-sm.svg'

import { Container } from '@/shared'

import { useProductsStore } from '@/store/useProductsStore'
import { useOrdersStore } from '@/store/useOrdersStore'

import { BaseInput, Typography } from '@/ui'

import s from './Header.module.scss'

const Header = () => {
  const [searchBook, setSearchBook] = useState('')

  const setSearchValue = useProductsStore((state) => state.setSearchKeywords)
  const cartCounter = useOrdersStore((state) => state.order)
  const navigate = useNavigate()
  const cartQuantity = cartCounter.reduce((acc, item) => acc + item.quantity, 0)
  const handleSearch = () => {
    setSearchValue(searchBook)
    navigate('/shop')
  }

  return (
    <>
      <div className={s['header_banner']}>
        <p>Безкоштовна доставка для замовлень від 2000 грн</p>
      </div>
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
                  <Typography tag="h4">Жанри</Typography>
                  <ul>
                    <li>
                      <Link to="/shop">Художня</Link>
                    </li>
                    <li>
                      <Link to="/shop">Документальна</Link>
                    </li>
                    <li>
                      <Link to="/shop">Освітня</Link>
                    </li>
                    <li>
                      <Link to="/shop">Дитяча</Link>
                    </li>
                  </ul>
                </div>

                <div className={s.mega_menu__contnet__item}>
                  <Typography tag="h4">Подарунки</Typography>
                  <ul>
                    <li>
                      <Link to="/shop">Подарункові сертифікати</Link>
                    </li>
                    <li>
                      <Link to="/shop">Подрунки для дітей</Link>
                    </li>
                    <li>
                      <Link to="/shop">Готові сети подарунків</Link>
                    </li>
                    <li>
                      <Link to="/shop">Для жінок</Link>
                    </li>
                    <li>
                      <Link to="/shop">Для чоловіків</Link>
                    </li>
                  </ul>
                </div>

                <ul className={s.mega_menu__contnet__main}>
                  <li>
                    <Link to="/shop">Книги року</Link>
                  </li>
                  <li>
                    <Link to="/shop">Нові надходження</Link>
                  </li>
                  <li>
                    <Link to="/">Блог</Link>
                  </li>
                  <li>
                    <Link to="/">Телеграм книжковий клуб</Link>
                  </li>
                  <li>
                    <Link to="/">Програма безкоштовної доставки</Link>
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
              <a
                href="#"
                className={s.header_top__search__button}
                onClick={(e) => {
                  e.preventDefault()

                  handleSearch()
                }}>
                <img src={search_icon} alt="search icon" />
              </a>
            </div>

            <div className={s.header_top__right_menu}>
              <div className={s.header_top__right_menu__tools}>
                <div>
                  <img src={account_icon} alt="my-account" />
                </div>
                <div>
                  <img src={wishlist_icon} alt="wishlist" />
                </div>
                <Link to="/cart" className={s.cart_icon}>
                  <div className={s.cart_icon__counter}>{cartCounter.length}</div>
                  <img src={cart_icon} alt="cart" />
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
              <Link to="/cart" className={s.cart_icon}>
                <div className={s.cart_icon__counter}>{cartQuantity}</div>
                <img src={cart_icon} alt="cart" />
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Header
