import Header from '@/components/header/Header'
import ProductGrid from '@/components/productGrid/ProductGrid'
import Footer from '@/components/footer/Footer'

import Container from '@/shared/container/Container'

import Typography from '@/ui/typography/Typography'

import s from './Shop.module.scss'

const Shop = () => {
  return (
    <>
      <Header />
      <div className={s.shopMain}>
        <Container>
          <Typography className={s.title} tag="h2">
            Книга року
          </Typography>

          <div className={s.filterList}>
            <div className={s.filterList__items}>
              <div className={s.filterList__item}>
                <div>Фентезі</div>
                <span>x</span>
              </div>
              <div className={s.filterList__item}>
                <div>Пригоди</div>
                <span>x</span>
              </div>
              <div className={s.filterList__item}>
                <div>Детективи</div>
                <span>x</span>
              </div>
            </div>
            <div className="filterList__sort">
              <select>
                <option value="1">Сортувати за</option>
                <option value="2">Популярністю</option>
                <option value="3">Ціною</option>
                <option value="4">Назвою</option>
              </select>
            </div>
          </div>
        </Container>
        <Container>
          <div className={s.shopMain__content}>
            <div className={s.sidebar}></div>
            <div className={s.mainContent__inner}>
              <ProductGrid />
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  )
}

export default Shop
