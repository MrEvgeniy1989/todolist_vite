import { appActions } from '@/app/appSlice'
import { clearData } from '@/common/actions/commonActions'
import { ResultCode } from '@/common/enums/enums'
import { createAppAsyncThunk } from '@/common/utils/createAppAsyncThunk'
import { authApi } from '@/features/auth/api/authApi'
import { LoginForm } from '@/features/auth/auth.types'
import { Slice, createSlice, isAnyOf } from '@reduxjs/toolkit'

const slice: Slice = createSlice({
  extraReducers: builder =>
    builder.addMatcher(
      isAnyOf(me.fulfilled, login.fulfilled, logout.fulfilled),
      (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      }
    ),
  initialState: {
    isLoggedIn: false,
  },
  name: 'auth',
  reducers: {},
})

//Thunks
const me = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/me`,
  async (_, { dispatch, rejectWithValue }) => {
    const res = await authApi
      .me()
      .finally(() => dispatch(appActions.setInitialized({ isInitialized: true })))

    if (res.data.resultCode === ResultCode.Succeeded) {
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(res.data)
    }
  }
)
const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginForm>(
  `${slice.name}/login`,
  async (loginForm, { rejectWithValue }) => {
    const res = await authApi.login(loginForm)

    if (res.data.resultCode === ResultCode.Succeeded) {
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(res.data)
    }
  }
)
const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/logout`,
  async (_, { dispatch, rejectWithValue }) => {
    const res = await authApi.logout()

    if (res.data.resultCode === ResultCode.Succeeded) {
      dispatch(clearData())

      return { isLoggedIn: false }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

export const authReducer = slice.reducer
export const authThunks = { login, logout, me }
