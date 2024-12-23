import { useNavigate } from 'react-router-dom'

export const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <button onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  )
}
