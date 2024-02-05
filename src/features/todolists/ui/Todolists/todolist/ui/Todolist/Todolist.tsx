import { AddItemForm } from '@/common/components/AddItemForm/AddItemForm'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { TodolistDomain } from '@/features/todolists/todolists.types'
import { FilterButtons } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/FilterButtons/FilterButtons'
import { TodolistTitle } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/TodolistTitle/TodolistTitle'
import { tasksThunks } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/model/tasksSlice'
import { Tasks } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/ui/Tasks/Tasks'

import s from './Todolist.module.scss'

type Props = {
  todolist: TodolistDomain
}

export const Todolist = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const addTask = (title: string) => {
    dispatch(tasksThunks.addTask({ title, todolistId: todolist.id }))
  }

  return (
    <div className={s.todolist}>
      <div>
        <TodolistTitle title={todolist.title} todolistId={todolist.id} />
        <AddItemForm
          callback={addTask}
          className={s.addItemForm}
          classNameTextField={s.addItemFormTextField}
          entityTitle={'task'}
        />
      </div>
      <Tasks todolistId={todolist.id} />
      <FilterButtons />
    </div>
  )
}
