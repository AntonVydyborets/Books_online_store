import React from 'react';
import styles from './SlideItem.module.scss';

interface Book {
  cover: string;
  title: string;
  genre: string;
  price: number;
  stock: boolean;
}

interface SlideItemProps {
  book: Book | null;
}

const SlideItem: React.FC<SlideItemProps> = ({ book }) => {
  return (
    <>
      {book && (
        <div className={styles.container}>
          <div className={styles['img-wrap']}>
            <img src={book.cover} alt={book.title} />
          </div>
          <div className={styles['content-wrap']}>
            <h6 className={styles.title}>{book.title}</h6>
            <p className={styles.genre}>{book.genre}</p>
            <p className={styles.price}>{book.price} грн.</p>
            <p className={styles.stock}>{book.stock ? 'В наявності' : 'Out of stock'}</p>
            <div className={styles['cost-block']}>
              <button>Buy</button>
              <p>icon</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SlideItem;