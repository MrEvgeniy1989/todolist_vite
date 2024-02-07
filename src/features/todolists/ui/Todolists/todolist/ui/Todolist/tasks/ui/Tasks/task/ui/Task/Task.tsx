import { ChangeEvent } from 'react'

import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan'
import { TaskStatuses } from '@/common/enums/enums'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { tasksThunks } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/model/tasksSlice'
import { TaskType } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/tasks.types'
import Delete from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'

import s from './Task.module.scss'

type Props = {
  disabled: boolean
  task: TaskType
}

export const Task = ({ disabled, task }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTaskHandler = () =>
    dispatch(tasksThunks.deleteTask({ taskId: task.id, todolistId: task.todoListId }))
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(
      tasksThunks.updateTask({
        taskId: task.id,
        todolistId: task.todoListId,
        updateDomainModel: {
          status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
        },
      })
    )
  const changeTaskTitleHandler = (title: string) =>
    dispatch(
      tasksThunks.updateTask({
        taskId: task.id,
        todolistId: task.todoListId,
        updateDomainModel: { title },
      })
    )

  return (
    <li className={s.task}>
      <div>
        <Checkbox
          checked={task.status !== TaskStatuses.New}
          disabled={disabled}
          onChange={changeTaskStatusHandler}
        />
        <EditableSpan
          callback={changeTaskTitleHandler}
          classNameForSpan={task.status !== TaskStatuses.New ? s.taskDone : ''}
          disabled={disabled}
          title={task.title}
        />
      </div>
      <IconButton disabled={disabled} onClick={deleteTaskHandler}>
        <Delete />
      </IconButton>
    </li>
  )
}
