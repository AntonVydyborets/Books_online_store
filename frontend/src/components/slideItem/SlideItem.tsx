import React from 'react'

import { ProductItemSlide } from '@/components'

import { BookItem } from '@/utils/types/BookItemType.ts'

interface SlideItemProps {
  book: BookItem | null
}

const SlideItem: React.FC<SlideItemProps> = ({ book }) => {
  return <>{book && <ProductItemSlide {...book} />}</>
}

export default SlideItem
