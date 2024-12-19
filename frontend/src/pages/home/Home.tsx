import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'

import { Blog, Footer, Header, SliderBooks, SubscribeForm } from '@/components'

import useProductsStore from '@/store/useProductsStore.ts'

import { fetchBooks } from '@/services/api'

import s from './Home.module.scss'

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
      <div>
        <SliderBooks data={allBooks} title="РОЗПРОДАЖ" />
        <SliderBooks data={allBooks} title="НОВИНКИ" />
        <Blog data={blogs} />

        <div className={s.container}>
          <h3 className={s.title}>ІСТОРІЯ НАШОГО ВИДАВНИЦТВА</h3>
          <p className={s.content}>
            Lorem ipsum dolor sit amet consectetur. Ullamcorper morbi aliquam volutpat amet pulvinar id euismod. Mi
            vestibulum ut dictumst semper amet tempor tristique lectus. Vel odio in quam non aliquet velit nec rhoncus
            velit. Sem justo turpis viverra a sed convallis rhoncus. Magna malesuada dictumst lectus sollicitudin tellus
            dolor. Nulla at amet cum felis condimentum diam facilisis. Eu adipiscing neque eget scelerisque adipiscing
            lectus augue dui. Diam nulla suspendisse et quis montes curabitur. Congue elementum elementum vestibulum at
            venenatis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur. Ullamcorper morbi aliquam volutpat amet pulvinar id euismod. Mi
            vestibulum ut dictumst semper amet tempor tristique lectus. Vel odio in quam non aliquet velit nec rhoncus
            velit. Sem justo turpis viverra a sed convallis rhoncus. Magna malesuada dictumst lectus sollicitudin tellus
            dolor. Nulla at amet cum felis condimentum diam facilisis. Eu adipiscing neque eget scelerisque adipiscing
            lectus augue dui. Diam nulla suspendisse et quis montes curabitur. Congue elementum elementum vestibulum at
            venenatis.
          </p>
        </div>

        <SubscribeForm />
        <Footer />
      </div>
    </>
  )
}

export default Home
