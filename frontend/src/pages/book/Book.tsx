import { useProductsStore } from '@/store/useProductsStore'
import { SliderBooks } from '@/components'
import BookPreview from '@/components/bookPreview/BookPreview'
import Footer from '@/layout/footer/Footer'
import Header from '@/layout/header/Header'
import s from './Book.module.scss'

const Book = () => {
  const allBooks = useProductsStore((state) => state.allProducts)
  const chooseBook = useProductsStore((state) => state.bookById)
  return (
    <>
      <Header />
      <BookPreview book={chooseBook} />
      <SliderBooks data={allBooks} title="Вам також може сподобатись:" />
      <Footer />
    </>
  )
}

export default Book
