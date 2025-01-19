import { createBrowserRouter } from 'react-router-dom'

import { Cart, ErrorPage, Home, Shop, Book, Checkout } from '@/pages'

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
    path: '/books/:bookId',
    element: <Book />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export default router
