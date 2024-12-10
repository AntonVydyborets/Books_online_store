import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SlideItem from '../slideItem/SlideItem'
import { Navigation } from 'swiper/modules'
import 'swiper/scss'
import 'swiper/scss/navigation'
import styles from './SliderBooks.module.scss'

interface SliderBooksProps {
  title: string;
  data: []; // Array of Book objects
}

const SliderBooks: React.FC<SliderBooksProps> = ({ title, data }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        loop={true}
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
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        >
        {data.map((book) => (
          <SwiperSlide key={book.id}>
            <SlideItem book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SliderBooks;