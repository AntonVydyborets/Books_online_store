import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import { FC } from 'react'

interface CircleProgressProps {
  isButton?: boolean
}

const CircleProgress: FC<CircleProgressProps> = ({ isButton }) => {
  const globalStyle = {
    color: 'grey.500',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const btnStyle = {
    color: 'grey.500',
  }

  return (
    <Stack sx={isButton ? btnStyle : globalStyle} spacing={2} direction="row">
      <CircularProgress size={15} color="secondary" />
    </Stack>
  )
}

export default CircleProgress
