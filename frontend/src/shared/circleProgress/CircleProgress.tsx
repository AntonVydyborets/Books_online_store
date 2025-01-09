import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

export default function CircleProgress() {
  return (
    <Stack
      sx={{ color: 'grey.500', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      spacing={2}
      direction="row">
      <CircularProgress color="secondary" />
    </Stack>
  )
}
