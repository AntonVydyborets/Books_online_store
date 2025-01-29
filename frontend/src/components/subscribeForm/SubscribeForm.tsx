import Books from '@/assets/images/booksImg.png'
import styles from './SubscribeForm.module.scss'
import { Container } from '@/shared'

const SubscribeForm = () => {
  return (
    <div className={styles.container}>
      <Container className={styles.wrap}>
        <div className={styles.inner}>
          <p className={styles.text}>Нові книги та акції – у твоїй пошті</p>
          <button className={styles['btn-subscribe']}>Підписатись</button>
        </div>

        <div className={styles.image}>
          <img src={Books} alt="books" />
        </div>
      </Container>
    </div>
  )
}

export default SubscribeForm
