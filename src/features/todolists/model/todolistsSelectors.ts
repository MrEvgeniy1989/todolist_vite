import { RootState } from '@/app/store'
import { TodolistDomain } from '@/features/todolists/todolists.types'

export const selectTodolists = (state: RootState): TodolistDomain[] => state.todolists
