import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { todolistsActions } from '@/features/todolists/model/todolistsSlice'
import { FilterValues } from '@/features/todolists/todolists.types'
import Button from '@mui/material/Button'

import s from './FilterButtons.module.scss'

type Props = {
  disabled: boolean
  filter: FilterValues
  todolistId: string
}

export const FilterButtons = ({ disabled, filter, todolistId }: Props) => {
  const dispatch = useAppDispatch()

  const changeFilter = (filter: FilterValues) => {
    dispatch(todolistsActions.changeFilter({ filter, todolistId }))
  }

  const setFilterAll = () => changeFilter('all')
  const setFilterActive = () => changeFilter('active')
  const setFilterCompleted = () => changeFilter('completed')

  return (
    <div className={s.filterButtons}>
      <Button
        color={'success'}
        disabled={disabled}
        onClick={setFilterAll}
        variant={filter === 'all' ? 'contained' : 'outlined'}
      >
        All
      </Button>
      <Button
        color={'primary'}
        disabled={disabled}
        onClick={setFilterActive}
        variant={filter === 'active' ? 'contained' : 'outlined'}
      >
        Active
      </Button>
      <Button
        color={'secondary'}
        disabled={disabled}
        onClick={setFilterCompleted}
        variant={filter === 'completed' ? 'contained' : 'outlined'}
      >
        Completed
      </Button>
    </div>
  )
}
