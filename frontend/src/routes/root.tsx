import { createBrowserRouter } from 'react-router-dom'

import { Cart, ErrorPage, Home, Shop } from '@/pages'

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
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export default router
