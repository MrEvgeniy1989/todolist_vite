import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { BaseResponse } from '@/common/types/types'
import { FormikError } from '@/features/auth/auth.types'
import { authThunks } from '@/features/auth/model/authSlice'
import { useFormik } from 'formik'

export const useLogin = () => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: (values, formikHelpers) => {
      dispatch(authThunks.login(values))
        .unwrap()
        .catch((err: BaseResponse) => {
          err.fieldsErrors?.forEach(fieldsError => {
            return formikHelpers.setFieldError(fieldsError.field, fieldsError.error)
          })
        })
    },
    validate: values => {
      const errors: FormikError = {}

      if (!values.email) {
        errors.email = 'Email is required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Password is required'
      } else if (values.password.length < 3) {
        errors.password = 'Must be 3 characters or more'
      }

      return errors
    },
  })

  return { formik }
}
