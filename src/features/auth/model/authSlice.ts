import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  initialState: {
    isLoggedIn: false,
  },
  name: 'auth',
  reducers: {},
})

export const authReducer = slice.reducer
export const authActions = slice.actions
