import { FC, InputHTMLAttributes } from 'react'

import clsx from 'clsx'

import s from './BaseInput.module.scss'

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const BaseInput: FC<BaseInputProps> = ({ ...props }) => {
  return <input className={clsx(s.baseInput, props.className)} {...props} />
}
