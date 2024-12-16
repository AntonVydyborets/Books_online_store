import Blog from '@/components/blog/Blog'
import SliderBooks from '@/components/sliderBooks/SliderBooks'
import SubscribeForm from '@/components/subscribeForm/SubscribeForm'
import Footer from '@/components/layout/footer/Footer'
import Header from '@/components/layout/header/Header'

import useProductsStore from '@/store/useProductsStore.ts'

import OurHistory from '@/shared/ourHistory/OurHistory'

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
        <OurHistory />
        <SubscribeForm />
        <Footer />
      </div>
    </>
  )
}

export default Home
