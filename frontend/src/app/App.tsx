import { RouterProvider } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import router from '@/routes/root'

import '@/assets/styles/App.scss'
import BtnToTop from '@/components/btnToTop/BtnToTop'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <BtnToTop />
    </QueryClientProvider>
  )
}

export default App
