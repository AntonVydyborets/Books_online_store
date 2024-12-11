import BaseButton from '@/ui/baseButton/BaseButton'

import s from './ProductItem.module.scss'

const ProductItem = () => {
  return (
    <div>
      <div className={s.container}>
        <div className={s['img-wrap']}>
          <img src="https://laboratory.ua/files/products/za-perekopom-ye-zemlia-1000-2.1800x1200w.jpg" alt={'title'} />
        </div>
        <div className={s['content-wrap']}>
          <h6 className={s.title}>За Перекопом є земля 1</h6>
          <p className={s.genre}>Fiction</p>
          <p className={s.price}>400 грн.</p>
          <p className={s.stock}>{true ? 'В наявності' : 'Out of stock'}</p>
          <div className={s['cost-block']}>
            <BaseButton>Купити</BaseButton>
            <p>icon</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
