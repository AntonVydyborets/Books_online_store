import { useProductsStore } from '@/store/useProductsStore'
import { SliderBooks, SubscribeForm } from '@/components'
import BookPreview from '@/components/bookPreview/BookPreview'
import Footer from '@/layout/footer/Footer'
import Header from '@/layout/header/Header'
import { useQuery } from '@tanstack/react-query'
import { fetchBookById, fetchBookImageById } from '@/services/api'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'

const Book = () => {
  const [cover, setCover] = useState<string>('')

  const { bookId } = useParams()

  const { data } = useQuery({
    queryKey: ['book'],
    queryFn: () => fetchBookById(bookId),
    enabled: !!bookId, // Only run this query when searchKeywords is present
  })

  const { allProducts, bookById, setBookById } = useProductsStore((state) => state)

  const { data: imageData } = useQuery({
    queryKey: ['image', bookId],
    queryFn: () => fetchBookImageById(`${bookId}`),
    enabled: !!bookId,
  })
  bookById['cover'] = cover

  useEffect(() => {
    if (data) {
      const modifiedBook = {
        ...data.data,
        price: data.data.current_price,
      }
      setBookById(modifiedBook)
    }
  }, [data, setBookById])

  useEffect(() => {
    if (imageData) {
      const objectUrl = URL.createObjectURL(imageData)
      setCover(objectUrl)

      return () => URL.revokeObjectURL(objectUrl) // Уникнення memory leak
    }
  }, [imageData])

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
