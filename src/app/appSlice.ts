import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  initialState: {
    error: null as null | string,
    isInitialized: false,
  },
  name: 'app',
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error
    },
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
