import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { selectAppStatus, selectIsInitialized } from '@/app/appSelectors'
import { ButtonAppBar } from '@/common/components/ButtonAppBar/ButtonAppBar'
import { ErrorSnackbar } from '@/common/components/ErrorSnackbar/ErrorSnackbar'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { authThunks } from '@/features/auth/model/authSlice'
import { Login } from '@/features/auth/ui/Login/Login'
import { Todolists } from '@/features/todolists/ui/Todolists/Todolists'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress'

export const App = () => {
  const dispatch = useAppDispatch()
  const appStatus = useAppSelector(selectAppStatus)
  const isInitialized = useAppSelector(selectIsInitialized)

  useEffect(() => {
    dispatch(authThunks.me())
  }, [dispatch])

  if (!isInitialized) {
    return (
      <div
        style={{
          position: 'fixed',
          textAlign: 'center',
          top: '30%',
          width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return (
    <div>
      <ErrorSnackbar />
      <ButtonAppBar />
      {appStatus === 'loading' && <LinearProgress color={'secondary'} />}
      <Container fixed>
        <Routes>
          <Route element={<Todolists />} path={'/'} />
          <Route element={<Login />} path={'/login'} />
          <Route element={<div>Error 404</div>} path={'/404'} />
          <Route element={<Navigate to={'/404'} />} path={'*'} />
        </Routes>
      </Container>
    </div>
  )
}
