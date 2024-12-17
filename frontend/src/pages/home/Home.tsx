import { Blog, Footer, Header, SliderBooks, SubscribeForm } from '@/components'

import useProductsStore from '@/store/useProductsStore.ts'

import s from './Home.module.scss'

const Home = () => {
  const saleBooks = useProductsStore((state) => state.saleBooks)
  const newBooks = useProductsStore((state) => state.newBooks)
  const blogs = useProductsStore((state) => state.blogs)

  return (
    <>
      <Header />
      <div>
        <SliderBooks data={saleBooks} title="РОЗПРОДАЖ" />
        <SliderBooks data={newBooks} title="НОВИНКИ" />
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
