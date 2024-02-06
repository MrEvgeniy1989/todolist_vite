import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { AddItemForm } from '@/common/components/AddItemForm/AddItemForm'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { selectIsLoggedIn } from '@/features/auth/model/authSelectors'
import { selectTodolists } from '@/features/todolists/model/todolistsSelectors'
import { todolistsThunks } from '@/features/todolists/model/todolistsSlice'
import { Todolist } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/Todolist'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

export const Todolists = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const todolists = useAppSelector(selectTodolists)

  useEffect(() => {
    dispatch(todolistsThunks.getTodolists())
  }, [dispatch])

  const addTodolist = (title: string) => {
    dispatch(todolistsThunks.addTodolist({ title }))
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div>
      <Grid container style={{ margin: '20px' }}>
        <AddItemForm callback={addTodolist} entityTitle={'todolist'} />
      </Grid>

      <Grid container>
        {todolists.map((todolist, index) => {
          return (
            <Grid item key={todolist.id} style={{ margin: '20px' }}>
              <Paper elevation={24} style={{ padding: '20px' }}>
                <Todolist key={index} todolist={todolist} />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
