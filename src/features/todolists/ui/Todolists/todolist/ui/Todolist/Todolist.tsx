import { useMemo } from 'react'

import { AddItemForm } from '@/common/components/AddItemForm/AddItemForm'
import { TaskStatuses } from '@/common/enums/enums'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { TodolistDomain } from '@/features/todolists/todolists.types'
import { FilterButtons } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/FilterButtons/FilterButtons'
import { TodolistTitle } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/TodolistTitle/TodolistTitle'
import { selectTasks } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/model/tasksSelectors'
import { tasksThunks } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/model/tasksSlice'
import { Tasks } from '@/features/todolists/ui/Todolists/todolist/ui/Todolist/tasks/ui/Tasks/Tasks'

import s from './Todolist.module.scss'

type Props = {
  todolist: TodolistDomain
}

export const Todolist = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()
  let tasks = useAppSelector(selectTasks(todolist.id))

  const addTask = (title: string) => {
    dispatch(tasksThunks.addTask({ title, todolistId: todolist.id }))
  }

  tasks = useMemo(() => {
    let filteredTasks = tasks

    if (todolist.filter === 'active') {
      filteredTasks = filteredTasks.filter(task => task.status === TaskStatuses.New)
    } else if (todolist.filter === 'completed') {
      filteredTasks = filteredTasks.filter(task => task.status === TaskStatuses.Completed)
    }

    return filteredTasks
  }, [todolist.filter, tasks])

  return (
    <div className={s.todolist}>
      <div>
        <TodolistTitle
          entityStatus={todolist.entityStatus}
          title={todolist.title}
          todolistId={todolist.id}
        />
        <AddItemForm
          callback={addTask}
          className={s.addItemForm}
          classNameTextField={s.addItemFormTextField}
          disabled={todolist.entityStatus === 'loading'}
          entityTitle={'task'}
        />
      </div>
      <Tasks disabled={todolist.entityStatus === 'loading'} tasks={tasks} />
      <FilterButtons disabled={todolist.entityStatus === 'loading'} todolistId={todolist.id} />
    </div>
  )
}
