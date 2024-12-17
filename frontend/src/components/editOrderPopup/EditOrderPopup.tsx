import { FC } from 'react'
import s from './EditOrderPopup.module.scss'
import { FilterType } from '@/utils/types/FilterType'

interface OrderPopupProps {
  order: FilterType
  toggleModal: (edit: boolean) => void
}
const EditOrderPopup: FC<OrderPopupProps> = (props) => {
  console.log('order', props)
  const { order, toggleModal } = props
  return (
    <div className={s.container}>
      <div onClick={() => toggleModal()} className={s.overlay}></div>
      <div className={s.wrap}>
        <h4>Кошик</h4>
        <p className={s.close} onClick={() => toggleModal()}>
          X
        </p>
      </div>
    </div>
  )
}

export default EditOrderPopup
