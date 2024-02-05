import { RootState } from '@/app/store'

export const selectIsInitialized = (state: RootState): boolean => state.app.isInitialized
export const selectError = (state: RootState): null | string => state.app.error
