import Button from '@mui/material/Button'

import s from './FilterButtons.module.scss'

export const FilterButtons = () => {
  return (
    <div className={s.filterButtons}>
      <Button color={'success'} variant={'contained'}>
        All
      </Button>
      <Button color={'primary'} variant={'contained'}>
        Active
      </Button>
      <Button color={'secondary'} variant={'contained'}>
        Completed
      </Button>
    </div>
  )
}
