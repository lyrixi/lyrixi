export type CommonResult<T = undefined> = {
  status: 'success' | 'error' | 'empty' | 'cancel'
  code?: string
  message?: string
  data?: T
}

export type SuccessResult<T = undefined> = {
  status: 'success'
  code?: string
  message?: string
  data?: T
}

export type ErrorResult<T = undefined> = {
  status: 'error'
  code?: string
  message?: string
  data?: T
}

export type EmptyResult<T = undefined> = {
  status: 'empty'
  code?: string
  message?: string
  data?: T
}

export type CancelResult<T = undefined> = {
  status: 'cancel'
  code?: string
  message?: string
  data?: T
}
