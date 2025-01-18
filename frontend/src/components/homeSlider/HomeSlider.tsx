import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import banner1 from '@/assets/images/homeBanners/banner1.png'

// @ts-ignore
import 'swiper/scss'
// @ts-ignore
import 'swiper/scss/autoplay'
// @ts-ignore
import 'swiper/css/pagination'

import s from './HomeSlider.module.scss'

const HomeSlider = () => {
  const slides = [banner1, banner1]
  return (
    <div className={s.wrap}>
      <Swiper
        centeredSlides={true}
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Autoplay, Pagination]}>
        {slides.map((item) => (
          <SwiperSlide key={item}>
            <div className={s['img-wrap']}>
              <img src={item} alt={item} loading="lazy" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HomeSlider
