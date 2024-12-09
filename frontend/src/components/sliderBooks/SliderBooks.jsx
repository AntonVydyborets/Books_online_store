import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SlideItem from '../slideItem/SlideItem'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import styles from './SliderBooks.module.scss'

export default function SliderBooks({ title, data }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        loop={true}
        navigation={true}
        modules={[Navigation]}>
        {data.map((book) => (
          <SwiperSlide key={book.id}>
            <SlideItem book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
