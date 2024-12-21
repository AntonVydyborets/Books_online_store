import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'

import { v4 as uuid } from 'uuid'
import { Range } from 'react-range'

import { FilterItem, Footer, Header, ProductItem } from '@/components'

import { fetchBooks } from '@/services/api.ts'

import { Container } from '@/shared'

import { useFiltersStore } from '@/store/useFiltersStore.ts'
import { useProductsStore } from '@/store/useProductsStore.ts'

import Typography from '@/ui/typography/Typography'
import BaseButton from '@/ui/baseButton/BaseButton.tsx'

import s from './Shop.module.scss'

const genreFilterItems = [
  {
    id: uuid(),
    title: 'Adventure',
  },
  {
    id: uuid(),
    title: 'Cooking',
  },
  {
    id: uuid(),
    title: 'Technology',
  },
]

const Shop = () => {
  const [sort, setSort] = useState('1')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [priceFilter, setPriceFilter] = useState<number[]>([])

  const setAllProducts = useProductsStore((state) => state.setAllProducts)
  const allProducts = useProductsStore((state) => state.allProducts)

  const selectedFilters = useFiltersStore((state) => state.selectedFilters)
  const removeFilter = useFiltersStore((state) => state.removeFilter)

  const location = useLocation()
  const navigate = useNavigate()

  const { data, isPending, error } = useQuery({
    queryKey: ['books', { limit: 12, min_price: priceFilter[0], max_price: priceFilter[1] }],
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

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
  }

  const applyPriceFilter = () => {
    setPriceFilter([priceRange[0], priceRange[1]])
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)

    // Set price filters if applied
    if (priceFilter.length > 0) {
      searchParams.set('min_price', priceFilter[0].toString())
      searchParams.set('max_price', priceFilter[1].toString())
    } else {
      searchParams.delete('min_price')
      searchParams.delete('max_price')
    }

    // Set selected genres
    if (selectedFilters.length > 0) {
      const genres = selectedFilters.map((filter) => filter.title).join(',')
      searchParams.set('genres', genres)
    } else {
      searchParams.delete('genres')
    }

    // Set sorting preference
    if (sort !== '1') {
      searchParams.set('sort', sort)
    } else {
      searchParams.delete('sort')
    }

    navigate({ search: searchParams.toString() }, { replace: true })
  }, [priceFilter, selectedFilters, sort, location.search, navigate])

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
              <div className={s.price_filter}>
                <Typography className={s.filterItem__title} tag="h5">
                  Ціна
                </Typography>

                <div className={s.range_filter}>
                  <Range
                    step={1}
                    min={0}
                    max={2000}
                    values={priceRange}
                    onChange={handlePriceChange}
                    renderTrack={({ props, children }) => (
                      <div {...props} className={s.range_btn_low}>
                        {children}
                      </div>
                    )}
                    renderThumb={({ props, index }) => (
                      <div className={s.range_btn_max} {...props} key={uuid()}>
                        <div className={s.range_values}>₴{priceRange[index]}</div>
                      </div>
                    )}
                  />
                  <BaseButton onClick={() => applyPriceFilter()} className={s.range_filter__button}>
                    Застосувати
                  </BaseButton>
                </div>
              </div>
              <FilterItem title="Жанр" filterItems={genreFilterItems} />
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
