import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'

import {
  Blog,
  Footer,
  Header,
  SliderBooks,
  SubscribeForm,
  HomeSlider,
  ChooseCategory,
  Achievements,
} from '@/components'

import { useProductsStore } from '@/store/useProductsStore.ts'

import { CircleProgress } from '@/shared'

import { fetchBooks } from '@/services/api'

const Home = () => {
  const setAllProducts = useProductsStore((state) => state.setAllProducts)
  const allBooks = useProductsStore((state) => state.allProducts)
  const blogs = useProductsStore((state) => state.blogs)
  console.log('allbooks', allBooks)
  const { data, isLoading, error } = useQuery({
    queryKey: ['books', { limit: 12 }],
    queryFn: fetchBooks,
  })

  useEffect(() => {
    if (data && data.data.items) {
      setAllProducts(data.data.items)
    }
  }, [data, setAllProducts])

  if (isLoading) return <CircleProgress />

  if (error) return <div>Error loading books</div>

  return (
    <>
      <Header />
      <HomeSlider />
      <SliderBooks data={allBooks} title="Книги року" link="Дивитись більше" />
      <Achievements />
      <SliderBooks data={allBooks} title="Нові надходження" link="Дивитись більше" />
      <ChooseCategory />
      <Blog data={blogs} />
      <SubscribeForm />
      <Footer />
    </>
  )
}

export default Home
