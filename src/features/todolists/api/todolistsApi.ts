import { instance } from '@/common/api/instance'

export const todolistsApi = {
  createTodolist(title: string) {
    return instance.post(`/todo-lists`, title)
  },
  deleteTodolist(todolistId: string) {
    return instance.delete(`/todo-lists/${todolistId}`)
  },
  getTodolists() {
    return instance.get(`/todo-lists`)
  },
  updateTodolistTitle(todolistId: string, title: string) {
    return instance.put(`/todo-lists/${todolistId}`, title)
  },
}
