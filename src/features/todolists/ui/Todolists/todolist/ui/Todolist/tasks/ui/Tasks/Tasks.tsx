import { Task } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/ui/Tasks/task/ui/Task/Task'

export const Tasks = () => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((_, index) => {
        return <Task key={index} />
      })}
    </div>
  )
}
