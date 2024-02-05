import { TaskPriorities, TaskStatuses } from '@/common/enums/enums'

export type TaskType = {
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
export type Tasks = {
  [todolistId: string]: TaskType[]
}
export type UpdateTaskModel = {
  deadline: string
  description: string
  priority: TaskPriorities
  startDate: string
  status: TaskStatuses
  title: string
}
export type updateTaskDomainModel = Partial<UpdateTaskModel>
export type getTasksResponse = {
  error: null | string
  items: TaskType[]
  totalCount: number
}
