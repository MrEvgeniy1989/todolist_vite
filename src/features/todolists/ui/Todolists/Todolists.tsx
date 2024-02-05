import { AddItemForm } from '@/common/components/AddItemForm/AddItemForm'
import { Todolist } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/Todolist'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

export const Todolists = () => {
  return (
    <div>
      <Grid container style={{ margin: '20px' }}>
        <AddItemForm />
      </Grid>

      <Grid container>
        {[1, 2].map((_, index) => {
          return (
            <Grid item key={index} style={{ margin: '20px' }}>
              <Paper elevation={24} style={{ padding: '20px' }}>
                <Todolist key={index} />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
