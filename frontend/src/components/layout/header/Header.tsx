import { FC, useState, useRef, useEffect } from 'react'
import { Link } from 'react-router'

import logo from '@/assets/images/logo.png'
import account_icon from '@/assets/images/account.svg'
import wishlist_icon from '@/assets/images/wishlist.svg'
import trash_icon from '@/assets/images/trash.svg'
import burger_menu from '@/assets/images/b_menu.svg'

import { Container, VerticalMenu } from '@/shared'

import { useProductsStore } from '@/store/useProductsStore.ts'

import { BaseInput } from '@/ui'

import s from './Header.module.scss'

interface HeaderProps {
  isMenuOpen?: boolean
}

const Header: FC<HeaderProps> = ({ isMenuOpen }) => {
  const [searchBook, setSearchBook] = useState('')

  const books = useProductsStore((state) => state.allProducts)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchedBooks = books.filter((book) => book.name.toLowerCase().includes(searchBook.toLowerCase()))

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setSearchBook('')
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
            <VerticalMenu isMenuOpen={isMenuOpen} />
            <div className={s.header_top__search}>
              <BaseInput
                type="text"
                placeholder="Пошук"
                value={searchBook}
                onChange={(e) => {
                  setSearchBook(e.currentTarget.value)
                }}
              />

              {searchBook && (
                <div ref={dropdownRef}>
                  <ul className={s.header_top__search__result}>
                    {searchedBooks.map((book) => (
                      <li key={book.id} className={s.header_top__search__result__link}>
                        <Link to={`/book/${book.id}`}>{book.name}</Link>
                      </li>
                    ))}

                    {!searchedBooks.length && <li>Нічого не знайдено...</li>}
                  </ul>
                </div>
              )}
            </div>

            <div className={s.header_top__right_menu}>
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
