import { TaskType } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/tasks.types'
import { Task } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/ui/Tasks/task/ui/Task/Task'

import s from './Tasks.module.scss'

type Props = {
  disabled: boolean
  tasks: TaskType[]
}

export const Tasks = ({ disabled, tasks }: Props) => {
  return (
    <div className={s.tasks}>
      {tasks.length ? (
        <ul>
          {tasks?.map(task => {
            return <Task disabled={disabled} key={task.id} task={task} />
          })}
        </ul>
      ) : (
        <span className={s.tasksSpan}>Todolist is empty!</span>
      )}
    </div>
  )
}
