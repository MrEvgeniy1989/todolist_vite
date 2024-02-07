import { clearData } from '@/common/actions/commonActions'
import { ResultCode } from '@/common/enums/enums'
import { createAppAsyncThunk } from '@/common/utils/createAppAsyncThunk'
import { todolistsThunks } from '@/features/todolists/model/todolistsSlice'
import { tasksApi } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/api/tasksApi'
import {
  TaskType,
  Tasks,
  updateTaskDomainModel,
} from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/tasks.types'
import { Slice, createSlice } from '@reduxjs/toolkit'

const slice: Slice<Tasks> = createSlice({
  extraReducers: builder =>
    builder
      .addCase(todolistsThunks.getTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach(todolist => {
          state[todolist.id] = []
        })
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsThunks.deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task)
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const index = state[action.payload.todolistId].findIndex(
          task => task.id === action.payload.taskId
        )

        if (index !== -1) {
          state[action.payload.todolistId].splice(index, 1)
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state[action.payload.todolistId].findIndex(
          task => task.id === action.payload.task.id
        )

        if (index !== -1) {
          state[action.payload.todolistId][index] = action.payload.task
        }
      })
      .addCase(clearData, () => {
        return {}
      }),
  initialState: {} as Tasks,
  name: 'tasks',
  reducers: {},
})

//Thunks
export const getTasks = createAppAsyncThunk<
  { tasks: TaskType[]; todolistId: string },
  { todolistId: string }
>(`${slice.name}/getTasks`, async ({ todolistId }, _) => {
  const res = await tasksApi.getTasks(todolistId)

  return { tasks: res.data.items, todolistId }
})
export const addTask = createAppAsyncThunk<
  { task: TaskType },
  { title: string; todolistId: string }
>(`${slice.name}/addTask`, async ({ title, todolistId }, { rejectWithValue }) => {
  const res = await tasksApi.createTask(todolistId, title)

  if (res.data.resultCode === ResultCode.Succeeded) {
    return { task: res.data.data.item }
  } else {
    return rejectWithValue(res.data)
  }
})
export const deleteTask = createAppAsyncThunk<
  { taskId: string; todolistId: string },
  { taskId: string; todolistId: string }
>(`${slice.name}/deleteTask`, async ({ taskId, todolistId }, { rejectWithValue }) => {
  const res = await tasksApi.deleteTask(todolistId, taskId)

  if (res.data.resultCode === ResultCode.Succeeded) {
    return { taskId, todolistId }
  } else {
    return rejectWithValue(res.data)
  }
})
export const updateTask = createAppAsyncThunk<
  { task: TaskType; todolistId: string },
  { taskId: string; todolistId: string; updateDomainModel: updateTaskDomainModel }
>(
  `${slice.name}/updateTask`,
  async ({ taskId, todolistId, updateDomainModel }, { getState, rejectWithValue }) => {
    const task = getState().tasks[todolistId].find(task => task.id === taskId)

    if (task) {
      const model = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        status: task.status,
        title: task.title,
        ...updateDomainModel,
      }

      const res = await tasksApi.updateTask(model, taskId, todolistId)

      if (res.data.resultCode === ResultCode.Succeeded) {
        return { task: res.data.data.item, todolistId }
      } else {
        return rejectWithValue(res.data)
      }
    } else {
      return rejectWithValue(null)
    }
  }
)

export const tasksReducer = slice.reducer
export const tasksThunks = { addTask, deleteTask, getTasks, updateTask }
