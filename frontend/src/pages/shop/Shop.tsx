import { useEffect, useMemo, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { FilterItem, Footer, Header, ProductItem } from '@/components'

import { fetchBooks } from '@/services/api.ts'

import { Container } from '@/shared'

import { useFiltersStore } from '@/store/useFiltersStore.ts'
import { useProductsStore } from '@/store/useProductsStore.ts'

import Typography from '@/ui/typography/Typography'

import s from './Shop.module.scss'

const Shop = () => {
  const [sort, setSort] = useState('1')

  const setAllProducts = useProductsStore((state) => state.setAllProducts)
  const allProducts = useProductsStore((state) => state.allProducts)

  const selectedFilters = useFiltersStore((state) => state.selectedFilters)
  const removeFilter = useFiltersStore((state) => state.removeFilter)

  const { data, isPending, error } = useQuery({
    queryKey: ['books', { limit: 12 }],
    queryFn: fetchBooks,
  })

  const filteredProducts = useMemo(() => {
    return selectedFilters.length > 0
      ? allProducts.filter((product) => selectedFilters.some((filter) => product.genre === filter.title))
      : allProducts
  }, [allProducts, selectedFilters])

  const sortedProducts = useMemo(() => {
    if (sort === '1') return filteredProducts
    if (sort === '2') return [...filteredProducts].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    if (sort === '3') return [...filteredProducts].sort((a, b) => a.price - b.price)
    if (sort === '4') return [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))
    return filteredProducts
  }, [filteredProducts, sort])

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
              {selectedFilters.map((filter) => (
                <div
                  key={filter.id}
                  className={s.filterList__item}
                  onClick={() => {
                    removeFilter(filter.id)
                  }}>
                  <div>{filter.title}</div>
                  <span>x</span>
                </div>
              ))}
            </div>
            <div className="filterList__sort">
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
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
                {sortedProducts.map((product) => (
                  <ProductItem key={product.id} {...product} />
                ))}
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
