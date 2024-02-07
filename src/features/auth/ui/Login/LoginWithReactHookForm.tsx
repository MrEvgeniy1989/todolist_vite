import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { BaseResponse } from '@/common/types/types'
import { LoginForm } from '@/features/auth/auth.types'
import { selectIsLoggedIn } from '@/features/auth/model/authSelectors'
import { authThunks } from '@/features/auth/model/authSlice'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

export const LoginWithReactHookForm = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginForm>()

  const onSubmit = (data: LoginForm) => {
    dispatch(authThunks.login(data))
      .unwrap()
      .catch((err: BaseResponse) => {
        err.fieldsErrors?.forEach(fieldsError => {
          if (fieldsError.field === 'email') {
            errors.email = { message: fieldsError.error, type: 'manual' }
          } else if (fieldsError.field === 'password') {
            errors.password = { message: fieldsError.error, type: 'manual' }
          }
        })
      })
  }

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <FormControl>
          <FormLabel>
            <p>
              To log in get registered
              <a
                href={'https://social-network.samuraijs.com/'}
                rel={'noreferrer'}
                target={'_blank'}
              >
                {' '}
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <TextField
                label={'Email'}
                margin={'normal'}
                {...register('email', {
                  pattern: {
                    message: 'Invalid email address',
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  },
                  required: 'Email is required',
                })}
              />
              {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
              <TextField
                label={'Password'}
                margin={'normal'}
                type={'password'}
                {...register('password', {
                  minLength: { message: 'Must be 3 characters or more', value: 3 },
                  required: 'Password is required',
                })}
              />
              {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
              <FormControlLabel
                control={<Checkbox {...register('rememberMe')} />}
                label={'Remember me'}
              />
              <Button color={'primary'} type={'submit'} variant={'contained'}>
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
