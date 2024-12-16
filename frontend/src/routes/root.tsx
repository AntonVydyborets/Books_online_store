import { createBrowserRouter } from 'react-router-dom'

import Home from '../pages/home/Home'
import Shop from '../pages/shop/Shop'
import Сheckout from '../pages/сheckout/Сheckout'

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
])

export default router
