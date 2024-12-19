import React from 'react'

import { RequiredBookItemTypeApi } from '@/utils/types/BookItemType.ts'

import styles from './SlideItem.module.scss'

interface SlideItemProps {
  book: RequiredBookItemTypeApi | null
}

const SlideItem: React.FC<SlideItemProps> = ({ book }) => {
  return (
    <>
      {book && (
        <div className={styles.container}>
          <div className={styles['img-wrap']}>
            <img
              src="https://laboratory.ua/files/products/za-perekopom-ye-zemlia-1000-2.1800x1200w.jpg"
              alt={book.name}
            />
          </div>
          <div className={styles['content-wrap']}>
            <h6 className={styles.title}>{book.name}</h6>
            <p className={styles.genre}>{book.genre}</p>
            <p className={styles.price}>{book.price} грн.</p>
            <p className={styles.stock}>{book.is_available ? 'В наявності' : 'Out of stock'}</p>
            <div className={styles['cost-block']}>
              <button>Buy</button>
              <p>icon</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SlideItem
