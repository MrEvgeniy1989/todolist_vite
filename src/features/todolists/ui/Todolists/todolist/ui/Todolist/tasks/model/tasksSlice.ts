import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  initialState: [],
  name: 'tasks',
  reducers: {},
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
