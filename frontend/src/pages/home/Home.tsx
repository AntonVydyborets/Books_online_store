import Blog from '@/components/blog/Blog'
import SliderBooks from '@/components/sliderBooks/SliderBooks'
import SubscribeForm from '@/components/subscribeForm/SubscribeForm'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'

import useProductsStore from '@/store/useProductsStore.ts'

import OurHistory from '@/shared/ourHistory/OurHistory'

const Home = () => {
  const saleBooks = useProductsStore((state) => state.saleBooks)
  const newBooks = useProductsStore((state) => state.newBooks)

  const blogs = [
    {
      id: 1,
      title: '1 Який рівень англійської потрібен для UX/UI дизайнерів',
      cover: 'https://nashformat.ua/files/slides_resized/2024_11_01_novynka_vid_timoti_snaydera_470h320.640x360.jpg',
      desc: 'Англійська мова в сучасному світі - це перепустка до високооплачуваної роботи. Lorem ipsum dolor sit.',
      date: '14.05.2023',
    },
    {
      id: 2,
      title: '2 Який рівень англійської потрібен для UX/UI дизайнерів',
      cover: 'https://nashformat.ua/files/slides_resized/2024_11_01_novynka_vid_timoti_snaydera_470h320.640x360.jpg',
      desc: 'Англійська мова в сучасному світі - це перепустка до високооплачуваної роботи. Lorem ipsum dolor sit.',
      date: '14.11.2020',
    },
    {
      id: 3,
      title: '3 Який рівень англійської потрібен для UX/UI дизайнерів',
      cover: 'https://nashformat.ua/files/slides_resized/2024_11_01_novynka_vid_timoti_snaydera_470h320.640x360.jpg',
      desc: 'Англійська мова в сучасному світі - це перепустка до високооплачуваної роботи.',
      date: '01.11.2014',
    },
    {
      id: 4,
      title: '4 Який рівень англійської потрібен для UX/UI дизайнерів',
      cover: 'https://nashformat.ua/files/slides_resized/2024_11_01_novynka_vid_timoti_snaydera_470h320.640x360.jpg',
      desc: 'Англійська мова в сучасному світі - це перепустка до високооплачуваної роботи. Lorem ipsum dolor sit.',
      date: '14.11.2017',
    },
  ]

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
