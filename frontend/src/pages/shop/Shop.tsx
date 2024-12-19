import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'

import { FilterItem, Footer, Header, ProductItem } from '@/components'

import useFiltersStore from '@/store/useFiltersStore.ts'
import useProductsStore from '@/store/useProductsStore.ts'

import { fetchBooks } from '@/services/api.ts'

import { Container } from '@/shared'

import Typography from '@/ui/typography/Typography'

import s from './Shop.module.scss'

const Shop = () => {
  const setAllProducts = useProductsStore((state) => state.setAllProducts)
  const allProducts = useProductsStore((state) => state.allProducts)

  const selectedFilters = useFiltersStore((state) => state.selectedFilters)
  const removeFilter = useFiltersStore((state) => state.removeFilter)

  const filteredProducts =
    selectedFilters.length > 0
      ? allProducts.filter((product) => selectedFilters.some((filter) => product.genre === filter.title))
      : allProducts
  console.log(filteredProducts)

  const { data, isPending, error } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  })

  useEffect(() => {
    if (data) {
      setAllProducts(data)
    }
  }, [data, setAllProducts])

  if (isPending) return <div>Loading...</div>

  if (error) return <div>Error loading books</div>

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
                {filteredProducts.map((i) => {
                  return (
                    <ProductItem
                      key={i.id}
                      id={i.id}
                      name={i.name}
                      genre={i.genre}
                      price={i.price}
                      is_available={i.is_available}
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
