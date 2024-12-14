import ProductItem from '../productItem/ProductItem'

import useProductsStore from '@/store/useProductsStore.ts'

import s from './ProductGrid.module.scss'

const ProductGrid = () => {
  const allProducts = useProductsStore((state) => state.allProducts)

  return (
    <div className={s.grid}>
      {allProducts.map((i) => {
        return (
          <ProductItem
            key={i.id}
            id={i.id}
            title={i.title}
            cover={i.cover}
            genre={i.genre}
            price={i.price}
            stock={i.stock}
          />
        )
      })}
    </div>
  )
}

export default ProductGrid
