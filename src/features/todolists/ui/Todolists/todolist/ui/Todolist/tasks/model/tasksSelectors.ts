import { RootState } from '@/app/store'
import { TaskType } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/tasks.types'

export const selectTasks =
  (todolistId: string) =>
  (state: RootState): TaskType[] =>
    state.tasks[todolistId]
