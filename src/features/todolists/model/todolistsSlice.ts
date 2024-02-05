import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  initialState: [],
  name: 'todolists',
  reducers: {},
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
