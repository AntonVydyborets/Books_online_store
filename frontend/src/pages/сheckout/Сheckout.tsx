import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import СheckoutCard from '@/components/checkoutCard/СheckoutCard'
import useProductsStore from '@/store/useProductsStore.ts'

const Сheckout = () => {
const orders = useProductsStore((state) => state.orders)
  return (
    <>
      <Header />
      <СheckoutCard data={orders} />
      <Footer />
    </>
  )
}

export default Сheckout
