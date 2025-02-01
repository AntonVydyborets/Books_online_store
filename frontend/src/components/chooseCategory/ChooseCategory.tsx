import { educational, children, fiction, nonFiction, foreignLanguage } from '@/data'
import CategoryItem from '../categoryItem/CategoryItem'
import bannerTelegram from '@/assets/images/bannerTelegram.png'
import Cover1 from '@/assets/images/cover1.png'
import Cover2 from '@/assets/images/cover2.png'
import Cover3 from '@/assets/images/cover3.png'
import Cover4 from '@/assets/images/cover4.png'
import Cover5 from '@/assets/images/cover5.png'
import Cover6 from '@/assets/images/cover6.png'
import Cover7 from '@/assets/images/cover7.png'
import s from './ChooseCategory.module.scss'
import { Link } from 'react-router-dom'
import { Container } from '@/shared'

function ChooseCategory() {
  return (
    <div className={s.wrap}>
      <h3 className={s.title}>Оберіть свою категорію</h3>
      <div className={s.container}>
        <Container className={s.grid}>
          <CategoryItem title="Художня" poster={Cover1} items={educational} />
          <CategoryItem title="документальна" poster={Cover2} items={children} />
          <CategoryItem title="Освітня" poster={Cover3} items={fiction} />
          <CategoryItem title="Дитяча" poster={Cover4} items={nonFiction} />
          <CategoryItem title="Іноземні мови" poster={Cover5} items={foreignLanguage} />
          <CategoryItem title="Книги за віком" poster={Cover6} items={foreignLanguage} />
          <CategoryItem title="Подарунки" poster={Cover7} items={foreignLanguage} />
          <Link to="#" className={s['img-wrap']}>
            <img src={bannerTelegram} alt="banner" />
          </Link>
        </Container>
      </div>
      <Link to="/shop" className={s['choose-btn']}>
        Обрати книгу
      </Link>
    </div>
  )
}

export default ChooseCategory
