import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { Range } from 'react-range'
import clsx from 'clsx'

import { genreFilterItems } from '@/pages/shop/data.ts'

import { FilterItem, Footer, Header, ProductItem } from '@/components'

import { fetchBooks } from '@/services/api.ts'

import { Container } from '@/shared'

import { useFiltersStore } from '@/store/useFiltersStore.ts'
import { useProductsStore } from '@/store/useProductsStore.ts'

import { BaseButton, Typography } from '@/ui'

import s from './Shop.module.scss'

enum SORT {
  DEFAULT = '1',
  POPULARITY = '2',
  PRICE = '3',
  NAME = '4',
}

enum PRICE {
  MIN = 0,
  MAX = 1000,
}

enum RANGE_PRICE {
  MIN = 0,
  MAX = 2000,
}

enum PAGE {
  FIRST_PAGE = 1,
  LIMITED_PRODUCTS = 10,
}

const Shop = () => {
  const [page, setPage] = useState<number>(PAGE.FIRST_PAGE)
  const [sort, setSort] = useState(SORT.DEFAULT)
  const [priceRange, setPriceRange] = useState([PRICE.MIN, PRICE.MAX])
  const [priceFilter, setPriceFilter] = useState<number[]>([])

  const setAllProducts = useProductsStore((state) => state.setAllProducts)
  const allProducts = useProductsStore((state) => state.allProducts)

  const selectedFilters = useFiltersStore((state) => state.selectedFilters)
  const removeFilter = useFiltersStore((state) => state.removeFilter)

  const location = useLocation()
  const navigate = useNavigate()

  const limit = PAGE.LIMITED_PRODUCTS

  const { data, isPending, error } = useQuery({
    queryKey: ['books', { skip: (page - 1) * limit, limit, min_price: priceFilter[0], max_price: priceFilter[1] }],
    queryFn: fetchBooks,
  })

  const filteredProducts = useMemo(() => {
    return selectedFilters.length > 0
      ? allProducts.filter((product) => selectedFilters.some((filter) => product.genre === filter.title))
      : allProducts
  }, [allProducts, selectedFilters])

  const sortedProducts = useMemo(() => {
    if (sort === SORT.DEFAULT) return filteredProducts
    if (sort === SORT.POPULARITY) return [...filteredProducts].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    if (sort === SORT.PRICE) return [...filteredProducts].sort((a, b) => a.price - b.price)
    if (sort === SORT.NAME) return [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title))

    return filteredProducts
  }, [filteredProducts, sort])

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
  }

  const applyPriceFilter = () => {
    setPriceFilter([priceRange[0], priceRange[1]])
  }

  const getTrackBackground = () => {
    const [min, max] = priceRange

    const rangeDiff = RANGE_PRICE.MAX - RANGE_PRICE.MIN
    const left = ((min - RANGE_PRICE.MIN) / rangeDiff) * 100
    const right = ((max - RANGE_PRICE.MIN) / rangeDiff) * 100

    return `linear-gradient(to right, #ccc ${left}%, #404040 ${left}%, #404040 ${right}%, #ccc ${right}%)`
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)

    // Set price filters if applied
    if (priceFilter.length > 0) {
      searchParams.set('min-price', priceFilter[0].toString())
      searchParams.set('max-price', priceFilter[1].toString())
    } else {
      searchParams.delete('min-price')
      searchParams.delete('max-price')
    }

    // Set selected genres
    if (selectedFilters.length > 0) {
      const genres = selectedFilters.map((filter) => filter.title).join(',')
      searchParams.set('genres', genres)
    } else {
      searchParams.delete('genres')
    }

    // Set sorting preference
    if (sort !== SORT.DEFAULT) {
      searchParams.set('sort', sort)
    } else {
      searchParams.delete('sort')
    }

    // Set pages.
    if (page !== PAGE.FIRST_PAGE) {
      searchParams.set('page', page.toString())
    } else {
      searchParams.delete('page')
    }

    navigate({ search: searchParams.toString() }, { replace: true })
  }, [priceFilter, selectedFilters, sort, page, location.search, navigate])

  console.log(data?.data.items)

  useEffect(() => {
    if (data && data.data.items) {
      setAllProducts(data.data.items)
    }
  }, [data, setAllProducts])

  if (isPending) return <div>Loading...</div>

  if (error) return <div>Error loading books</div>

  // Check if it's the last page
  const isLastPage = data?.data.items.length < limit

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
              <select value={sort} onChange={(e) => setSort(e.currentTarget.value as SORT)}>
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
                <Typography className={s.filter_item__title} tag="h5">
                  Price Range
                </Typography>

                <div className={s.range_filter}>
                  <Range
                    step={1}
                    min={RANGE_PRICE.MIN}
                    max={RANGE_PRICE.MAX}
                    values={priceRange}
                    onChange={handlePriceChange}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        className={s.range_btn_low}
                        style={{
                          background: getTrackBackground(),
                        }}>
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => <div className={s.range_btn_max} {...props} />}
                  />

                  <div className={s.range_values_container}>
                    <span>Price: </span>
                    <div className={s.range_value}>{priceRange[0]} UAN</div>
                    <span>-</span>
                    <div className={clsx(s.range_value, s.last_range_value)}>{priceRange[1]} UAN</div>
                    <BaseButton onClick={applyPriceFilter}>Filter</BaseButton>
                  </div>
                </div>
              </div>

              <FilterItem title="Жанр" filterItems={genreFilterItems} className={s.filter_item__title} />
            </div>

            <div className={s.mainContent__inner}>
              <div className={s.grid}>
                {sortedProducts.length > 0 ? (
                  sortedProducts.map((product) => <ProductItem key={product.id} {...product} />)
                ) : (
                  <div>Немає товарів, що відповідають вашим критеріям фільтрації.</div>
                )}
              </div>
              <div className={s.pagination}>
                <button
                  className={s.nav_button}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}>
                  Previous
                </button>

                <button className={s.nav_button} onClick={() => setPage((prev) => prev + 1)} disabled={isLastPage}>
                  Next
                </button>
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
