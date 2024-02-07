import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { todolistsActions } from '@/features/todolists/model/todolistsSlice'
import { FilterValues } from '@/features/todolists/todolists.types'
import Button from '@mui/material/Button'

import s from './FilterButtons.module.scss'

type Props = {
  disabled: boolean
  todolistId: string
}

export const FilterButtons = ({ disabled, todolistId }: Props) => {
  const dispatch = useAppDispatch()

  const changeFilter = (filter: FilterValues) => {
    dispatch(todolistsActions.changeFilter({ filter, todolistId }))
  }

  const setFilterAll = () => changeFilter('all')
  const setFilterActive = () => changeFilter('active')
  const setFilterCompleted = () => changeFilter('completed')

  return (
    <div className={s.filterButtons}>
      <Button color={'success'} disabled={disabled} onClick={setFilterAll} variant={'contained'}>
        All
      </Button>
      <Button color={'primary'} disabled={disabled} onClick={setFilterActive} variant={'contained'}>
        Active
      </Button>
      <Button
        color={'secondary'}
        disabled={disabled}
        onClick={setFilterCompleted}
        variant={'contained'}
      >
        Completed
      </Button>
    </div>
  )
}
