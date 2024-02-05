import { RequestStatus } from '@/common/types/types'

export type Todolist = {
  addedDate: string
  id: string
  order: number
  title: string
}
export type FilterValues = 'active' | 'all' | 'completed'
export type TodolistDomain = Todolist & {
  entityStatus: RequestStatus
  filter: FilterValues
}
