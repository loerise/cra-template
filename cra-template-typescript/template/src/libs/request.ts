import { AxiosResponse } from 'axios'
import Axios from 'axios-observable'
import * as R from 'ramda'

export const request: Axios = Axios.create({
  baseURL: '/service',
  timeout: 10000,
})

request.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

const targets = [request]

R.map(
  (target) =>
    target.interceptors.response.use(
      (response): AxiosResponse['data'] => {
        if (response.data.errorCode === null) {
          return R.pathOr([], ['data', 'data'], response)
        } else {
          return Promise.reject({
            status: response.status,
            code: R.pathOr(0, ['data', 'errorCode'], response),
            message: R.pathOr('', ['data', 'errorMsg'], response),
          })
        }
      },
      (error) => {
        return Promise.reject(error)
      }
    ),
  targets
)
