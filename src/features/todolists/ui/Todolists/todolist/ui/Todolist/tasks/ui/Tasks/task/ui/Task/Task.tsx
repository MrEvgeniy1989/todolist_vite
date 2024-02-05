import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan'
import Delete from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'

import s from './Task.module.scss'

export const Task = () => {
  return (
    <div className={s.task}>
      <div>
        <Checkbox checked />
        <EditableSpan title={'taskTitle'} />
      </div>
      <IconButton>
        <Delete />
      </IconButton>
    </div>
  )
}
