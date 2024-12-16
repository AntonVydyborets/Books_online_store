import Header from '@/components/layout/header/Header'
import Footer from '@/components/layout/footer/Footer'
import FilterItem from '@/components/filterItem/FilterItem'
import ProductItem from '@/components/productItem/ProductItem.tsx'

import useFiltersStore from '@/store/useFiltersStore.ts'
import useProductsStore from '@/store/useProductsStore.ts'

import Container from '@/shared/container/Container'

import Typography from '@/ui/typography/Typography'

import s from './Shop.module.scss'

const Shop = () => {
  const selectedFilters = useFiltersStore((state) => state.selectedFilters)
  const removeFilter = useFiltersStore((state) => state.removeFilter)
  const allProducts = useProductsStore((state) => state.allProducts)

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
              {selectedFilters.map((i) => {
                return (
                  <div key={i.id} className={s.filterList__item} onClick={() => removeFilter(i.id)}>
                    <div>{i.title}</div>
                    <span>x</span>
                  </div>
                )
              })}
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
            <div className={s.sidebar}>
              <FilterItem title="Жанр" />
            </div>
            <div className={s.mainContent__inner}>
              <div className={s.grid}>
                {allProducts.map((i) => {
                  return (
                    <ProductItem
                      key={i.id}
                      id={i.id}
                      title={i.title}
                      cover={i.cover}
                      genre={i.genre}
                      price={i.price}
                      stock={i.stock}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  )
}

export default Shop
