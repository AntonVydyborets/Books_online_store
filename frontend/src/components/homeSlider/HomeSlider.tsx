import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import banner1 from '@/assets/images/homeBanners/banner1.png'
import banner2 from '@/assets/images/homeBanners/banner2.png'
import banner3 from '@/assets/images/homeBanners/banner3.png'
import banner4 from '@/assets/images/homeBanners/banner4.png'

// @ts-ignore
import 'swiper/scss'
// @ts-ignore
import 'swiper/scss/autoplay'
// @ts-ignore
import 'swiper/css/pagination'

import s from './HomeSlider.module.scss'

const HomeSlider = () => {
  const slides = [banner1, banner2, banner3, banner4]
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
