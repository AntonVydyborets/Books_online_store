import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Header } from '@/components'

import error_image from '@/assets/images/404/error_404.jpg'

import s from './ErrorPage.module.scss'

interface ErrorPageProps {
  text?: string
  error?: {
    message: string
    status?: number
  }
}

export const ErrorPage: FC<ErrorPageProps> = ({ text, error }) => {
  return (
    <>
      <Header />
      <div className={s.error_page}>
        <div className={s.error_page__inner}>
          <img src={error_image} alt="error image" />
        </div>
        <div className={s.error_page__text}>{text}</div>
        {error && (
          <div className={s.error_page__details}>
            <p>Error: {error.message}</p>
            {error.status && <p>Status Code: {error.status}</p>}
          </div>
        )}

        {!error && <div className={s.error_page__not_found}>Not Found</div>}

        <Link to="/">Go back to the home page</Link>
      </div>
    </>
  )
}
