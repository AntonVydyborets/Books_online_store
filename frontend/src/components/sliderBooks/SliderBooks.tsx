import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'
import { Navigation } from 'swiper/modules'

import { Container } from '@/shared'

import SlideItem from '../slideItem/SlideItem'

import { RequiredBookItemTypeApi } from '@/utils/types/BookItemType.ts'
// @ts-ignore
import 'swiper/scss'
// @ts-ignore
import 'swiper/scss/navigation'
import styles from './SliderBooks.module.scss'

interface SliderBooksProps {
  title: string
  data: RequiredBookItemTypeApi[] | string
  link: string | null
}

const SliderBooks: React.FC<SliderBooksProps> = ({ title, data, link }) => {
  const slidesPerView = data.length < 5 ? data.length : 5
  const loop = data.length >= 5

  return (
    <Container>
      <h3 className={styles.title}>
        {title}
        <Link to="/">{link || null}</Link>
      </h3>
      <Swiper
        spaceBetween={10}
        slidesPerView={slidesPerView}
        loop={loop}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          440: {
            slidesPerView: 1,
          },
          674: {
            slidesPerView: 2,
          },
          901: {
            slidesPerView: 3,
          },
          1117: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}>
        {data.map((book) => (
          <SwiperSlide key={book.id} className={styles.swiper_slide}>
            <SlideItem book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}

export default SliderBooks
