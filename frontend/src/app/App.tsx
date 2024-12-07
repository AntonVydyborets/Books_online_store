import { RouterProvider } from 'react-router-dom'

import router from '../routes/root'

import '../assets/styles/App.scss'

function App() {
  return <RouterProvider router={router} />
}

export default App
