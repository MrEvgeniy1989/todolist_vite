import { instance } from '@/common/api/instance'
import { BaseResponseType } from '@/common/types/types'
import { LoginForm, User } from '@/features/auth/auth.types'
import { AxiosResponse } from 'axios'

export const authApi = {
  login(loginForm: LoginForm) {
    return instance.post<
      BaseResponseType<{ userId: number }>,
      AxiosResponse<BaseResponseType<{ userId: number }>>,
      LoginForm
    >(`/auth/login`, loginForm)
  },
  logout() {
    return instance.delete<BaseResponseType>(`/auth/login`)
  },
  me() {
    return instance.get<BaseResponseType<User>>(`/auth/me`)
  },
}
