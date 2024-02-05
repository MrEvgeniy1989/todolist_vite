import { instance } from '@/common/api/instance'
import { BaseResponse } from '@/common/types/types'
import {
  TaskType,
  UpdateTaskModel,
  getTasksResponse,
} from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/tasks.types'
import { AxiosResponse } from 'axios'

export const tasksApi = {
  createTask(todolistId: string, title: string) {
    return instance.post<
      BaseResponse<{ item: TaskType }>,
      AxiosResponse<BaseResponse<{ item: TaskType }>>,
      { title: string }
    >(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  getTasks(todolistId: string) {
    return instance.get<getTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  updateTask(updateModel: UpdateTaskModel, taskId: string, todolistId: string) {
    return instance.put<
      BaseResponse<{ item: TaskType }>,
      AxiosResponse<BaseResponse<{ item: TaskType }>>,
      UpdateTaskModel
    >(`/todo-lists/${todolistId}/tasks/${taskId}`, updateModel)
  },
}
