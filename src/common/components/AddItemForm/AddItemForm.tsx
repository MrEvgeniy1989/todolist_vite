import { ChangeEvent, KeyboardEvent, useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

type Props = {
  callback: (title: string) => void
  className?: string
  classNameButton?: string
  classNameTextField?: string
  disabled?: boolean
  entityTitle: string
}

export const AddItemForm = ({
  callback,
  className,
  classNameButton,
  classNameTextField,
  disabled,
  entityTitle,
}: Props) => {
  const [newTitle, setNewTitle] = useState('')
  const [error, setError] = useState<null | string>(null)

  const buttonStyle = {
    marginLeft: '10px',
    maxHeight: '40px',
    maxWidth: '40px',
    minHeight: '40px',
    minWidth: '40px',
  }
  const changeNewTitleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    error && setError(null)
    setNewTitle(e.currentTarget.value)
  }

  const addItemHandler = () => {
    if (newTitle.trim()) {
      callback(newTitle.trim())
      setNewTitle('')
    } else {
      setError('Title required!')
    }
  }
  const onKeyDownAddItemHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      addItemHandler()
    }
  }
  const onFocusNewTitleHandler = () => {
    setError('')
  }

  return (
    <div className={className}>
      <TextField
        className={classNameTextField}
        disabled={disabled}
        error={!!error}
        helperText={<span style={{ display: 'block', maxWidth: `190px` }}>{error}</span>}
        label={`Enter ${entityTitle} title...`}
        onChange={changeNewTitleHandler}
        onFocus={onFocusNewTitleHandler}
        onKeyDown={onKeyDownAddItemHandler}
        size={'small'}
        value={newTitle}
      />
      <Button
        className={classNameButton}
        onClick={addItemHandler}
        style={buttonStyle}
        variant={'contained'}
      >
        +
      </Button>
    </div>
  )
}
