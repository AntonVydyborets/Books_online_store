import { useProductsStore } from '@/store/useProductsStore'
import { SliderBooks, SubscribeForm } from '@/components'
import BookPreview from '@/components/bookPreview/BookPreview'
import Footer from '@/layout/footer/Footer'
import Header from '@/layout/header/Header'
import { useQuery } from '@tanstack/react-query'
import { fetchBookById } from '@/services/api'
import { useParams } from 'react-router'
import { useEffect } from 'react'

const Book = () => {
  const { bookId } = useParams()
  const { data } = useQuery({
    queryKey: ['book'],
    queryFn: () => fetchBookById(bookId),
    enabled: !!bookId, // Only run this query when searchKeywords is present
  })

  const { allProducts, bookById, setBookById } = useProductsStore((state) => state)
  useEffect(() => {
    if (data) {
      const modifiedBook = {
        ...data.data,
        price: data.data.current_price,
      }
      setBookById(modifiedBook)
    }
  }, [data, setBookById])
  return (
    <>
      <Header />
      <BookPreview book={bookById} />
      <SliderBooks data={allProducts} title="Вам також може сподобатись:" />
      <SubscribeForm />
      <Footer />
    </>
  )
}

export default Book
