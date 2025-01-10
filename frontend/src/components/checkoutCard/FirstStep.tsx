import { Link } from 'react-router-dom'
import Book from './Book.tsx'
import s from './СheckoutCard.module.scss'

function FirstStep(props) {
  const { order } = props

  return (
    <>
      <div className={s.first}>
        {order.orderItems.map(({ book }) => (
          <Book key={book.id} book={book} />
        ))}
        
        <Link to="/" className={s['to-catalog']} onClick={() => {}}>
          <span>&#8592;</span> До каталогу
        </Link>
      </div>
    </>
  )
}

export default FirstStep