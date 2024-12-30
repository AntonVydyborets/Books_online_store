import React from 'react'

import { ProductItem } from '@/components'

import { RequiredBookItemTypeApi } from '@/utils/types/BookItemType.ts'

// import styles from './SlideItem.module.scss'

interface SlideItemProps {
  book: RequiredBookItemTypeApi | null
}

const SlideItem: React.FC<SlideItemProps> = ({ book }) => {
  return <>{book && <ProductItem {...book} />}</>
}

export default SlideItem
