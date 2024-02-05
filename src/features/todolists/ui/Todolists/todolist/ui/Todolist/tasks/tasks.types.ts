import { TaskPriorities, TaskStatuses } from '@/common/enums/enums'

export type Task = {
  addedDate: string
  deadline: string
  description: string
  id: string
  order: number
  priority: TaskPriorities
  startDate: string
  status: TaskStatuses
  title: string
  todoListId: string
}
export type UpdateTaskModel = {
  deadline: string
  description: string
  priority: TaskPriorities
  startDate: string
  status: TaskStatuses
  title: string
}
export type getTasksResponse = {
  error: null | string
  items: Task[]
  totalCount: number
}
