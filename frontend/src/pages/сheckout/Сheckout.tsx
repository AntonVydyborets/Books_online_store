import Footer from '@/components/layout/footer/Footer'
import Header from '@/components/layout/header/Header'
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
