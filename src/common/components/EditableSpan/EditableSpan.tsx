import { ChangeEvent, FocusEvent, KeyboardEvent, useState } from 'react'

import TextField from '@mui/material/TextField'

type Props = {
  callback: (title: string) => void
  className?: string
  title: string
}

export const EditableSpan = ({ callback, className, title }: Props) => {
  const [edit, setEdit] = useState(false)
  const [newTitle, setNewTitle] = useState(title)

  const changeNewTitleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  const onBlurNewTitleHandler = () => {
    if (newTitle !== title) {
      callback(newTitle)
    }
    setEdit(false)
  }
  const onKeyDownChangeEditHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onBlurNewTitleHandler()
    }
    if (e.key === 'Escape') {
      setNewTitle(title)
      setEdit(!edit)
    }
  }
  const onFocusChangeEditHandler = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.select()
  }

  return edit ? (
    <TextField
      autoFocus
      onBlur={onBlurNewTitleHandler}
      onChange={changeNewTitleHandler}
      onFocus={onFocusChangeEditHandler}
      onKeyDown={onKeyDownChangeEditHandler}
      value={newTitle}
      variant={'standard'}
    />
  ) : (
    <span className={className} onDoubleClick={() => setEdit(true)}>
      {title}
    </span>
  )
}
