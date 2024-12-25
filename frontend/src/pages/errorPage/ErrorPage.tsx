import { Link } from 'react-router-dom'

export const ErrorPage = () => {
  return (
    <div>
      <h1>404</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link to="/">Go back to the home page</Link>
    </div>
  )
}
