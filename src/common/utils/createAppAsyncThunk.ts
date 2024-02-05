import { AppDispatch, RootState } from '@/app/store'
import { BaseResponse } from '@/common/types/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch
  rejectWithValue: BaseResponse | null
  state: RootState
}>()
