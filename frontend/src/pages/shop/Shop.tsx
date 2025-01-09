import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { Range } from 'react-range'
import clsx from 'clsx'

import { genreFilterItems } from '@/pages/shop/data.ts'
import { ErrorPage } from '../errorPage/ErrorPage'

import arrow_left from '@/assets/images/pagination/arrow_left.svg'
import arrow_right from '@/assets/images/pagination/arrow_right.svg'

import { FilterItem, Footer, Header, ProductItem } from '@/components'

import { fetchBooks } from '@/services/api.ts'

import { Container, CircleProgress } from '@/shared'

import { useFiltersStore } from '@/store/useFiltersStore.ts'
import { useProductsStore } from '@/store/useProductsStore.ts'

import { BaseButton, Typography } from '@/ui'

import { PAGE, PRICE, RANGE_PRICE, SORT } from '@/utils/enums/shopEnums'

import s from './Shop.module.scss'

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
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const limit = PAGE.LIMITED_PRODUCTS

  const { data, isPending, error } = useQuery({
    queryKey: [
      'books',
      {
        offset: (page - 1) * limit,
        limit,
        min_price: priceFilter[0],
        max_price: priceFilter[1],
      },
    ],
    queryFn: fetchBooks,
    // keepPreviousData: true, // Keeps the previous data while fetching new results
    // staleTime: 1000 * 60 * 5, // Optional: Cache data for 5 minutes
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

  useEffect(() => {
    if (data && data.data.items) {
      setAllProducts(data.data.items)
    }
  }, [data, setAllProducts])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, page])

  if (isPending) return <CircleProgress />

  if (error) return <ErrorPage text="An error occurred" error={error} />

  // Check if it's the last page
  const isLastPage = data?.data.items.length < limit

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const totalItems = data?.data.pagination.total || 0 // Assuming totalItems comes from the API
  const totalPages = Math.ceil(totalItems / limit)

  return (
    <>
      <Header />
      <div className={s.shopMain}>
        <Container>
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

              <FilterItem title="Genres" filterItems={genreFilterItems} className={s.filter_item__title} />
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
                {page > 1 && (
                  <button
                    className={s.nav_button}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}>
                    <img src={arrow_left} alt="arrow left" />
                    Previous
                  </button>
                )}

                <ul className={s.pagination_list}>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li
                      key={index + 1}
                      className={clsx(s.page_number, { [s.active_page_number]: page === index + 1 })}
                      onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </li>
                  ))}
                </ul>

                {!isLastPage && (
                  <button className={s.nav_button} onClick={() => setPage((prev) => prev + 1)} disabled={isLastPage}>
                    Next
                    <img src={arrow_right} alt="arrow right" />
                  </button>
                )}
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
