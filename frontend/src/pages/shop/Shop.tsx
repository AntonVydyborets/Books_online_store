import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { Range } from 'react-range'
import clsx from 'clsx'

import { genreFilterItems, publisherFilterItems } from '@/pages/shop/data.ts'
import { ErrorPage } from '@/pages'

import arrow_left from '@/assets/images/pagination/arrow_left.svg'
import arrow_right from '@/assets/images/pagination/arrow_right.svg'

import { FilterItem, Footer, Header, HomeSlider, ProductItem, SubscribeForm } from '@/components'

import { fetchBooks } from '@/services/api.ts'

import { Container, CircleProgress } from '@/shared'

import { useFiltersStore } from '@/store/useFiltersStore.ts'
import { useProductsStore } from '@/store/useProductsStore.ts'

import { BaseButton, Typography } from '@/ui'

import { PAGE, PRICE, RANGE_PRICE, SORT } from '@/utils/enums/shopEnums'
import { FilterType } from '@/utils/types/FilterType'

import s from './Shop.module.scss'

export const getFilterTitlesByType = (filters: FilterType[], type: 'genre' | 'publisher'): string[] => {
  return filters.filter((filter) => filter.type === type).map((filter) => filter.title)
}

const Shop = () => {
  const [page, setPage] = useState<number>(PAGE.FIRST_PAGE)
  const [sort, setSort] = useState(SORT.DEFAULT)
  const [priceRange, setPriceRange] = useState([PRICE.MIN, PRICE.MAX])
  const [priceFilter, setPriceFilter] = useState<number[]>([])
  const [sortType, setSortType] = useState<string | null>('')

  const { setAllProducts, allProducts, searchKeywords } = useProductsStore((state) => state)
  const { selectedFilters, removeFilter } = useFiltersStore((state) => state)

  const location = useLocation()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const limit = PAGE.LIMITED_PRODUCTS

  const genreFilters = useMemo(() => getFilterTitlesByType(selectedFilters, 'genre'), [selectedFilters])
  const publisherFilters = useMemo(() => getFilterTitlesByType(selectedFilters, 'publisher'), [selectedFilters])

  // Frist useQuery for fetching books.
  const { data, isLoading, error } = useQuery({
    queryKey: [
      'books',
      {
        offset: (page - 1) * limit,
        limit,
        min_price: priceFilter[0],
        max_price: priceFilter[1],
        genre: genreFilters.length > 0 ? genreFilters.join(',') : undefined,
        publisher: publisherFilters.length > 0 ? publisherFilters.join(',') : undefined,
      },
    ],
    queryFn: fetchBooks,
    enabled: !searchKeywords,
  })

  // Second useQuery for fetching searched books.
  const {
    data: searchedBooks,
    isLoading: isSearchedBooksLoading,
    error: searchedBooksError,
  } = useQuery({
    queryKey: ['searched_books', { search: searchKeywords }],
    queryFn: fetchBooks,
    enabled: !!searchKeywords, // Only run this query when searchKeywords is present
  })

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

  // Update URL search parameters based on filters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    setSortType(searchParams.get('sort'))
    // Set price filters if applied
    if (priceFilter.length > 0) {
      searchParams.set('min-price', priceFilter[0].toString())
      searchParams.set('max-price', priceFilter[1].toString())
    } else {
      searchParams.delete('min-price')
      searchParams.delete('max-price')
    }

    // Set selected genres
    if (genreFilters.length > 0) {
      searchParams.set('genres', genreFilters.join(','))
    } else {
      searchParams.delete('genres')
    }

    // Set selected publishers
    if (publisherFilters.length > 0) {
      searchParams.set('publishers', publisherFilters.join(','))
    } else {
      searchParams.delete('publishers')
    }

    // Set sorting preference
    if (sort !== SORT.DEFAULT) {
      searchParams.set('sort', sort)
    } else {
      searchParams.delete('sort')
    }

    // Set page
    if (page !== 1) {
      searchParams.set('page', page.toString())
    } else {
      searchParams.delete('page')
    }

    // Set search keywords
    if (searchKeywords) {
      searchParams.set('search-for', searchKeywords)
    } else {
      searchParams.delete('search-for')
    }

    navigate({ search: searchParams.toString() }, { replace: true })
  }, [priceFilter, genreFilters, publisherFilters, sort, page, location.search, navigate, searchKeywords])

  useEffect(() => {
    if (data && data.data && data.data.items) {
      setAllProducts(data.data.items)
    }
  }, [data, setAllProducts])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, page])

  // Handle loading states.
  if (isLoading || isSearchedBooksLoading) return <CircleProgress />

  // Handle error states.
  if (error || searchedBooksError) return <ErrorPage text="An error occurred" error={error || searchedBooksError} />

  // Check if it's the last page.
  const isLastPage =
    (data && data.data.items.length < limit) || (searchedBooks && searchedBooks?.data.items.length < limit)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const totalItems = searchKeywords ? searchedBooks?.data.pagination.total || 0 : data?.data?.pagination?.total || 0

  const totalPages = Math.ceil(totalItems / limit)

  const productsToDisplay =
    searchKeywords && searchedBooks?.data.items && searchedBooks?.data.items.length > 0
      ? searchedBooks.data.items
      : allProducts

  if (sortType === '2') {
    productsToDisplay.sort((a, b) => a.rating - b.rating)
  }
  if (sortType === '3') {
    productsToDisplay.sort((a, b) => a.price - b.price)
  }
  if (sortType === '4') {
    productsToDisplay.sort((a, b) => a.title.localeCompare(b.title))
  }

  return (
    <>
      <Header />
      <HomeSlider />
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

            <div className={s.filterList__sort}>
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
            {!searchKeywords && (
              <div className={s.sidebar}>
                <div className={s.price_filter}>
                  <Typography className={s.filter_item__title} tag="h5">
                    Ціна
                  </Typography>

                  <div className={s.range_filter}>
                    {/* 
                        TODO: FIX "KEY" ISSUE.
                        TODO: FIX RANGE CSS ISSUE
                    */}
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
                      <span>Ціна: </span>
                      <div className={s.range_value}>{priceRange[0]} грн</div>
                      <span>-</span>
                      <div className={clsx(s.range_value, s.last_range_value)}>{priceRange[1]} грн</div>
                      <BaseButton onClick={applyPriceFilter}>Фільтрувати</BaseButton>
                    </div>
                  </div>
                </div>

                <FilterItem
                  title="Жанри"
                  filterItems={genreFilterItems}
                  className={s.filter_item__title}
                  type="genre"
                />

                <FilterItem
                  title="Видавництво"
                  filterItems={publisherFilterItems}
                  className={s.filter_item__title}
                  type="publisher"
                />
              </div>
            )}

            <div className={s.mainContent__inner}>
              <div className={s.grid}>
                {productsToDisplay.length ? (
                  productsToDisplay.map((product) => <ProductItem key={product.id} {...product} />)
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
          <SubscribeForm />
        </Container>
      </div>
      <Footer />
    </>
  )
}

export default Shop
