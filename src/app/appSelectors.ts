import { RootState } from '@/app/store'
import { RequestStatus } from '@/common/types/types'

export const selectIsInitialized = (state: RootState): boolean => state.app.isInitialized
export const selectError = (state: RootState): null | string => state.app.error
export const selectAppStatus = (state: RootState): RequestStatus => state.app.appStatus
