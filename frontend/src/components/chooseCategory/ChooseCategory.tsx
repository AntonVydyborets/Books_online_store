import { educational, children, fiction, nonFiction, foreignLanguage } from '@/data'
import CategoryItem from '../categoryItem/CategoryItem'
import s from './ChooseCategory.module.scss'

function ChooseCategory() {
  const cover =
    'https://vivat.com.ua/resize_480x686x95/storage/1.d/files/8/f/8fe5be3a_overleyi-balada-pro-nedovgo-i-neshhaslivo_01.webp'
  return (
    <div className={s.container}>
      <h3>Choose your category</h3>
      <div className={s.wrap}>
        <CategoryItem title="Освітня література" poster={cover} items={educational} />
        <CategoryItem title="Книги для дітей" poster={cover} items={children} />
        <CategoryItem title="Художня література" poster={cover} items={fiction} />
        <CategoryItem title="Нехудожня література" poster={cover} items={nonFiction} />
        <CategoryItem title="Книги іноземними мовами" poster={cover} items={foreignLanguage} />
        <CategoryItem title="Книги іноземними мовами" poster={cover} items={foreignLanguage} />
        <CategoryItem title="Книги іноземними мовами" poster={cover} items={foreignLanguage} />
        <div className={s['img-wrap']}>
          <img
            src="https://vivat.com.ua/storage/1.d/files/3/a/3a86b575_680x880-77.jpg"
            alt="banner"
          />
        </div>
      </div>
    </div>
  )
}

export default ChooseCategory
