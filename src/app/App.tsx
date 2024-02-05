import { Navigate, Route, Routes } from 'react-router-dom'

import { ButtonAppBar } from '@/common/components/ButtonAppBar/ButtonAppBar'
import { ErrorSnackbar } from '@/common/components/ErrorSnackbar/ErrorSnackbar'
import { Login } from '@/features/auth/ui/Login/Login'
import { Todolists } from '@/features/todolists/ui/Todolists/Todolists'
import { Container } from '@mui/material'

export const App = () => {
  return (
    <div>
      <ErrorSnackbar />
      <ButtonAppBar />
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
