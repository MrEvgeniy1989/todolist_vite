export type User = {
  email: string
  id: number
  login: string
}
export type LoginForm = {
  captcha?: boolean
  email: string
  password: string
  rememberMe: boolean
}
export type FormikError = Partial<Omit<LoginForm, 'captcha'>>
