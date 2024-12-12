import Header from '@/components/header/Header'
import ProductGrid from '@/components/productGrid/ProductGrid'

import Container from '@/shared/container/Container'

import Typography from '@/ui/typography/Typography'

import s from './Shop.module.scss'

const Shop = () => {
  return (
    <>
      <Header />
      <div className="shopMain">
        <Container>
          <Typography className={s.title} tag="h2">
            Книга року
          </Typography>
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
    </>
  )
}

export default Shop
