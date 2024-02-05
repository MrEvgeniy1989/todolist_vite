import { instance } from '@/common/api/instance'
import { BaseResponseType } from '@/common/types/types'
import {
  Task,
  UpdateTaskModel,
  getTasksResponse,
} from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/tasks.types'
import { AxiosResponse } from 'axios'

export const tasksApi = {
  createTask(todolistId: string, title: string) {
    return instance.post<
      BaseResponseType<{ item: Task }>,
      AxiosResponse<BaseResponseType<{ item: Task }>>,
      { title: string }
    >(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  getTasks(todolistId: string) {
    return instance.get<getTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
    return instance.put<
      BaseResponseType<{ item: Task }>,
      AxiosResponse<BaseResponseType<{ item: Task }>>,
      UpdateTaskModel
    >(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}
