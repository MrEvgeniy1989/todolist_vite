export type RequestStatusType = 'failed' | 'idle' | 'loading' | 'succeeded'

export type FieldErrorType = {
  error: string
  field: string
}
export type BaseResponseType<D = {}> = {
  data: D
  fieldsErrors: FieldErrorType[]
  messages: string[]
  resultCode: number
}

export type ErrorType = {
  error: string
  messages: string[]
  statusCode: number
}
