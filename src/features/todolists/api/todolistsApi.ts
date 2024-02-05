import { instance } from '@/common/api/instance'
import { BaseResponseType } from '@/common/types/types'
import { Todolist } from '@/features/todolists/todolists.types'
import { AxiosResponse } from 'axios'

export const todolistsApi = {
  createTodolist(title: string) {
    return instance.post<
      BaseResponseType<{ item: Todolist }>,
      AxiosResponse<BaseResponseType<{ item: Todolist }>>,
      { title: string }
    >(`/todo-lists`, { title })
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}`)
  },
  getTodolists() {
    return instance.get<Todolist[]>(`/todo-lists`)
  },
  updateTodolistTitle(todolistId: string, title: string) {
    return instance.put<
      BaseResponseType<{ item: Todolist }>,
      AxiosResponse<BaseResponseType<{ item: Todolist }>>,
      { title: string }
    >(`/todo-lists/${todolistId}`, { title })
  },
}
