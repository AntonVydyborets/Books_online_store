import Header from '@/components/header/Header'

import Container from '@/shared/container/Container'

import Typography from '@/ui/typography/Typography'

const Shop = () => {
  return (
    <>
      <Header />
      <div className="shop_main">
        <Container>
          <Typography tag="h1">Shop</Typography>
        </Container>
      </div>
    </>
  )
}

export default Shop
