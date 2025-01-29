import React, { useState } from 'react'
import cx from 'clsx'
import toTop from '@/assets/images/to-top.png'
import s from './BtnToTop.module.scss'

function BtnToTop() {
  const [showBtn, setShowBtn] = useState(false)

  window.onscroll = function () {
    scrollFunction()
  }

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      setShowBtn(true)
    } else {
      setShowBtn(false)
    }
  }
  function topFunction() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
  return (
    <button onClick={topFunction} className={cx(showBtn ? s.myBtn : s.none)} title="Go to top">
      <img src={toTop} alt='to top' />
    </button>
  )
}

export default BtnToTop
