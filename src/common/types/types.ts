export type RequestStatus = 'failed' | 'idle' | 'loading' | 'succeeded'

export type FieldError = {
  error: string
  field: string
}
export type BaseResponse<D = {}> = {
  data: D
  fieldsErrors: FieldError[]
  messages: string[]
  resultCode: number
}

export type Error = {
  error: string
  messages: string[]
  statusCode: number
}
