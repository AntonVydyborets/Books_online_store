import { createBrowserRouter } from 'react-router-dom'

import { ErrorPage, Home, Shop, Сheckout } from '@/pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/shop',
    element: <Shop />,
  },
  {
    path: '/checkout',
    element: <Сheckout />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export default router
