import { clearData } from '@/common/actions/commonActions'
import { ResultCode } from '@/common/enums/enums'
import { RequestStatus } from '@/common/types/types'
import { createAppAsyncThunk } from '@/common/utils/createAppAsyncThunk'
import { todolistsApi } from '@/features/todolists/api/todolistsApi'
import { FilterValues, Todolist, TodolistDomain } from '@/features/todolists/todolists.types'
import { tasksThunks } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/model/tasksSlice'
import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit'

const slice: Slice<TodolistDomain[]> = createSlice({
  extraReducers: builder =>
    builder
      .addCase(getTodolists.fulfilled, (_, action) => {
        return action.payload.todolists.map(todolist => ({
          ...todolist,
          entityStatus: 'idle',
          filter: 'all',
        }))
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, entityStatus: 'idle', filter: 'all' })
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)

        if (index !== -1) {
          state.splice(index, 1)
        }
      })
      .addCase(updateTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)

        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
      .addCase(clearData, () => {
        return []
      }),
  initialState: [] as TodolistDomain[],
  name: 'todolists',
  reducers: {
    changeEntityStatus: (
      state,
      action: PayloadAction<{ entityStatus: RequestStatus; todolistId: string }>
    ) => {
      const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)

      if (index !== -1) {
        state[index].entityStatus = action.payload.entityStatus
      }
    },
    changeFilter: (state, action: PayloadAction<{ filter: FilterValues; todolistId: string }>) => {
      const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)

      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    },
  },
})

const getTodolists = createAppAsyncThunk<{ todolists: Todolist[] }, undefined>(
  `${slice.name}/getTodolists`,
  async (_, { dispatch }) => {
    const res = await todolistsApi.getTodolists()

    res.data.forEach(todolist => dispatch(tasksThunks.getTasks({ todolistId: todolist.id })))

    return { todolists: res.data }
  }
)
const addTodolist = createAppAsyncThunk<{ todolist: Todolist }, { title: string }>(
  `${slice.name}/addTodolist`,
  async ({ title }, { rejectWithValue }) => {
    const res = await todolistsApi.createTodolist(title)

    if (res.data.resultCode === ResultCode.Succeeded) {
      return { todolist: res.data.data.item }
    } else {
      return rejectWithValue(res.data)
    }
  }
)
const deleteTodolist = createAppAsyncThunk<{ todolistId: string }, { todolistId: string }>(
  `${slice.name}/deleteTodolist`,
  async ({ todolistId }, { dispatch, rejectWithValue }) => {
    dispatch(todolistsActions.changeEntityStatus({ entityStatus: 'loading', todolistId }))
    const res = await todolistsApi.deleteTodolist(todolistId).finally(() => {
      dispatch(todolistsActions.changeEntityStatus({ entityStatus: 'idle', todolistId }))
    })

    if (res.data.resultCode === ResultCode.Succeeded) {
      return { todolistId }
    } else {
      return rejectWithValue(res.data)
    }
  }
)
const updateTodolistTitle = createAppAsyncThunk<
  { title: string; todolistId: string },
  { title: string; todolistId: string }
>(`${slice.name}/updateTodolistTitle`, async ({ title, todolistId }, { rejectWithValue }) => {
  const res = await todolistsApi.updateTodolistTitle(todolistId, title)

  if (res.data.resultCode === ResultCode.Succeeded) {
    return { title, todolistId }
  } else {
    return rejectWithValue(res.data)
  }
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = { addTodolist, deleteTodolist, getTodolists, updateTodolistTitle }
