import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

// @ts-ignore
import 'swiper/scss'
// @ts-ignore
import 'swiper/scss/autoplay'

import s from './HomeSlider.module.scss'

const HomeSlider = () => {
  const slides = [
    'https://nashformat.ua/files/slides_resized/knyhoobmin4_1170x510-1-.1170x510.jpg',
    'https://nashformat.ua/files/slides_resized/new_konservator_1170x510-min.1170x510.jpg',
    'https://nashformat.ua/files/slides_resized/1170x510_re.1170x510.jpg',
  ]
  return (
    <div className={s.wrap}>
      <Swiper
        centeredSlides={true}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Autoplay]}>
        {slides.map((item) => (
          <SwiperSlide>
            <div className={s['img-wrap']}>
              <img src={item} alt={item} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HomeSlider
