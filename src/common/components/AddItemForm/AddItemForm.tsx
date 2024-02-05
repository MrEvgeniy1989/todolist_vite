import { TextField } from '@mui/material'
import Button from '@mui/material/Button'

type Props = {
  className?: string
  classNameButton?: string
  classNameTextField?: string
}

export const AddItemForm = ({ className, classNameButton, classNameTextField }: Props) => {
  const buttonStyle = {
    marginLeft: '10px',
    maxHeight: '40px',
    maxWidth: '40px',
    minHeight: '40px',
    minWidth: '40px',
  }

  return (
    <div className={className}>
      <TextField className={classNameTextField} size={'small'} />
      <Button className={classNameButton} style={buttonStyle} variant={'contained'}>
        +
      </Button>
    </div>
  )
}
