import { appReducer } from '@/app/appSlice'
import { authReducer } from '@/features/auth/model/authSlice'
import { todolistsReducer } from '@/features/todolists/model/todolistsSlice'
import { tasksReducer } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/model/tasksSlice'
import { configureStore } from '@reduxjs/toolkit'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    tasks: tasksReducer,
    todolists: todolistsReducer,
  },
})
