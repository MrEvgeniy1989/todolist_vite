import { SyntheticEvent, forwardRef } from 'react'

import { selectError } from '@/app/appSelectors'
import { appActions } from '@/app/appSlice'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant={'filled'} {...props} />
})

export const ErrorSnackbar = () => {
  const error = useAppSelector<null | string>(selectError)
  const dispatch = useAppDispatch()

  const handleClose = (_event?: Event | SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(appActions.setAppError({ error: null }))
  }

  return (
    <Snackbar autoHideDuration={6000} onClose={handleClose} open={!!error}>
      <Alert onClose={handleClose} severity={'error'} sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
