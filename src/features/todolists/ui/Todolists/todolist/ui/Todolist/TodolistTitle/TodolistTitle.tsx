import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan'
import Delete from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

import s from './TodolistTitle.module.scss'

export const TodolistTitle = () => {
  return (
    <div className={s.todolistTitle}>
      <EditableSpan className={s.todolistTitleSpan} title={'sdfsdf'} />
      <IconButton>
        <Delete />
      </IconButton>
    </div>
  )
}
