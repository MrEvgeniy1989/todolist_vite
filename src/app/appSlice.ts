import { RequestStatus } from '@/common/types/types'
import { authThunks } from '@/features/auth/model/authSlice'
import { todolistsThunks } from '@/features/todolists/model/todolistsSlice'
import { tasksThunks } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/model/tasksSlice'
import {
  AnyAction,
  PayloadAction,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'

const slice = createSlice({
  extraReducers: builder =>
    builder
      .addMatcher(isPending, state => {
        state.appStatus = 'loading'
      })
      .addMatcher(isFulfilled, state => {
        state.appStatus = 'succeeded'
      })
      .addMatcher(isRejected, (state, action: AnyAction) => {
        state.appStatus = 'failed'

        if (action.payload) {
          if (
            action.type === todolistsThunks.addTodolist.rejected.type ||
            action.type === tasksThunks.addTask.rejected.type ||
            action.type === authThunks.me.rejected.type
          ) {
            return
          }

          state.error = action.payload.messages[0]
        } else {
          state.error = action.error.message ? action.error.message : 'Some error occurred'
        }
      }),
  initialState: {
    appStatus: 'idle' as RequestStatus,
    error: null as null | string,
    isInitialized: false,
  },
  name: 'app',
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error
    },
    setInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
