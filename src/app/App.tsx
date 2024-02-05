import { Navigate, Route, Routes } from 'react-router-dom'

import { selectAppStatus } from '@/app/appSelectors'
import { ButtonAppBar } from '@/common/components/ButtonAppBar/ButtonAppBar'
import { ErrorSnackbar } from '@/common/components/ErrorSnackbar/ErrorSnackbar'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { Login } from '@/features/auth/ui/Login/Login'
import { Todolists } from '@/features/todolists/ui/Todolists/Todolists'
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress'

export const App = () => {
  const appStatus = useAppSelector(selectAppStatus)

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
