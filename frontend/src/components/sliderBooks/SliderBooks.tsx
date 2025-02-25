import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Container } from '@/shared'
import SlideItem from '../slideItem/SlideItem'

import { BookItem } from '@/utils/types/BookItemType.ts'
// @ts-ignore
import 'swiper/scss'
// @ts-ignore
// import 'swiper/scss/navigation'
import styles from './SliderBooks.module.scss'
import { Link } from 'react-router-dom'
import { NavigationOptions } from 'swiper/types'

interface SliderBooksProps {
  title: string
  link?: string
  data: BookItem[]
}

const SliderBooks: React.FC<SliderBooksProps> = ({ title, data, link }) => {
  const slidesPerView = data.length < 5 ? data.length : 5
  const loop = data.length >= 5

  const navigationNextRef = useRef(null)
  const navigationPrevRef = useRef(null)
  return (
    <Container className={styles.container}>
      <div className={styles.top}>
        <h3 className={styles.title}>{title}</h3>
        <Link to="/shop" className={styles.link}>
          {link}
        </Link>
      </div>
      <button ref={navigationPrevRef} className={styles.prev}></button>
      <button ref={navigationNextRef} className={styles.next}></button>
      <Swiper
        spaceBetween={10}
        slidesPerView={slidesPerView}
        loop={loop}
        navigation={true}
        modules={[Navigation]}
        speed={400}
        onInit={(swiper) => {
          if (!swiper || !swiper.params.navigation) return
          const navigation = swiper.params.navigation as NavigationOptions
          if (navigationPrevRef.current && navigationNextRef.current) {
            navigation.prevEl = navigationPrevRef.current
            navigation.nextEl = navigationNextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
          }
        }}
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
