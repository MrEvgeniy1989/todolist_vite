import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { todolistsThunks } from '@/features/todolists/model/todolistsSlice'
import Delete from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

import s from './TodolistTitle.module.scss'

type Props = {
  title: string
  todolistId: string
}

export const TodolistTitle = ({ title, todolistId }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTodolistHandler = () => dispatch(todolistsThunks.deleteTodolist({ todolistId }))
  const changeTotolistTitleHandler = (title: string) =>
    dispatch(todolistsThunks.updateTodolistTitle({ title, todolistId }))

  return (
    <div className={s.todolistTitle}>
      <EditableSpan
        callback={changeTotolistTitleHandler}
        className={s.todolistTitleSpan}
        title={title}
      />
      <IconButton onClick={deleteTodolistHandler}>
        <Delete />
      </IconButton>
    </div>
  )
}
