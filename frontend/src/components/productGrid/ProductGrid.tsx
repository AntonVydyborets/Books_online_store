import ProductItem from '../productItem/ProductItem'

import s from './ProductGrid.module.scss'

const ProductGrid = () => {
  return (
    <div className={s.grid}>
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />

      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />

      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
    </div>
  )
}

export default ProductGrid
