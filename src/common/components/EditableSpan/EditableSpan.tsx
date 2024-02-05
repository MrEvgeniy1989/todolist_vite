import { ChangeEvent, useState } from 'react'

import TextField from '@mui/material/TextField'

type Props = {
  className?: string
  title: string
}

export const EditableSpan = ({ className, title }: Props) => {
  const [edit, setEdit] = useState(false)
  const [newTitle, setNewTitle] = useState(title)

  const changeNewTitleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  const onBlurNewTitleHandler = () => {
    setEdit(false)
  }

  return edit ? (
    <TextField
      autoFocus
      onBlur={onBlurNewTitleHandler}
      onChange={changeNewTitleHandler}
      value={newTitle}
    />
  ) : (
    <span className={className} onDoubleClick={() => setEdit(true)}>
      {title}
    </span>
  )
}
