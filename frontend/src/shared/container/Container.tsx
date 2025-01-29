import { FC, ReactNode } from 'react'

import clsx from 'clsx'

import s from './Container.module.scss'

interface ContainerProps {
  children: ReactNode
  className?: string
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return <div className={clsx(s.container, className)}>{children}</div>
}

export default Container
