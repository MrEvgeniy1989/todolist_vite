import { instance } from '@/common/api/instance'
import { BaseResponse } from '@/common/types/types'
import { LoginForm, User } from '@/features/auth/auth.types'
import { AxiosResponse } from 'axios'

export const authApi = {
  login(loginForm: LoginForm) {
    return instance.post<
      BaseResponse<{ userId: number }>,
      AxiosResponse<BaseResponse<{ userId: number }>>,
      LoginForm
    >(`/auth/login`, loginForm)
  },
  logout() {
    return instance.delete<BaseResponse>(`/auth/login`)
  },
  me() {
    return instance.get<BaseResponse<User>>(`/auth/me`)
  },
}
