import { createBrowserRouter } from 'react-router-dom'

import Home from '../pages/home/Home'
import Shop from '../pages/shop/Shop'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/shop',
    element: <Shop />,
  },
])

export default router
