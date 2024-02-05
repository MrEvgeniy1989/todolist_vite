import { AddItemForm } from '@/common/components/AddItemForm/AddItemForm'
import { FilterButtons } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/FilterButtons/FilterButtons'
import { TodolistTitle } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/TodolistTitle/TodolistTitle'
import { Tasks } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/ui/Tasks/Tasks'

import s from './Todolist.module.scss'

export const Todolist = () => {
  return (
    <div>
      <div>
        <TodolistTitle />
        <AddItemForm className={s.addItemForm} classNameTextField={s.addItemFormTextField} />
      </div>
      <Tasks />
      <FilterButtons />
    </div>
  )
}
