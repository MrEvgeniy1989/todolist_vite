import { useAppSelector } from '@/common/hooks/useAppSelector'
import { selectTasks } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/model/tasksSelectors'
import { Task } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/ui/Tasks/task/ui/Task/Task'

import s from './Tasks.module.scss'

type Props = {
  todolistId: string
}

export const Tasks = ({ todolistId }: Props) => {
  const tasks = useAppSelector(selectTasks(todolistId))

  return (
    <div className={s.tasks}>
      {tasks.length ? (
        <ul>
          {tasks.map(task => {
            return <Task key={task.id} task={task} />
          })}
        </ul>
      ) : (
        <span className={s.tasksSpan}>Todolist is empty!</span>
      )}
    </div>
  )
}
