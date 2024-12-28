import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'

import { Blog, Footer, Header, SliderBooks, SubscribeForm, BonusProgram, HomeSlider, ChooseCategory } from '@/components'

import { useProductsStore } from '@/store/useProductsStore.ts'

import { fetchBooks } from '@/services/api'

const Home = () => {
  const setAllProducts = useProductsStore((state) => state.setAllProducts)
  const allBooks = useProductsStore((state) => state.allProducts)
  const blogs = useProductsStore((state) => state.blogs)

  const { data, isPending, error } = useQuery({
    queryKey: ['books', { limit: 12 }],
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
      <HomeSlider />
      <SliderBooks data={allBooks} title="РОЗПРОДАЖ" />
      <SliderBooks data={allBooks} title="НОВИНКИ" />
      <ChooseCategory />
      <BonusProgram />
      <Blog data={blogs} />
      <SubscribeForm />
      <Footer />
    </>
  )
}

export default Home
