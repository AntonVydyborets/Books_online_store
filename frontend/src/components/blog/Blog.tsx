import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import styles from './Blog.module.scss'
import BlogItem from '../blogItem/BlogItem'

interface SliderBlogsProps {
  data: [];
}

const Blog: React.FC<SliderBlogsProps> = ({data}) => {
  return (
    <div className={styles.container}>
      <h3>Blog</h3>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        loop={true}
        breakpoints={{
          440: {
            slidesPerView: 1,
          },
          674: {
            slidesPerView: 2,
          },
          912: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        >
        {data.map((blog) => (
          <SwiperSlide key={blog.id}>
            <BlogItem blog={blog} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Blog
