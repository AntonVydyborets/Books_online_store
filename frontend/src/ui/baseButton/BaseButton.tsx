import { FC, ButtonHTMLAttributes } from 'react'

import clsx from 'clsx'

import s from './BaseButton.module.scss'

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const BaseButton: FC<BaseButtonProps> = ({ ...props }) => {
  return (
    <button className={clsx(s.baseButton, props.className)} {...props}>
      {props.children}
    </button>
  )
}
