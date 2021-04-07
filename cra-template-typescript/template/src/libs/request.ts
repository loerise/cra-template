import { AxiosResponse } from 'axios'
import Axios from 'axios-observable'
import * as R from 'ramda'

import { AxiosOverload } from '../types/service'
import { loading$, updateStore } from './subscription'

export const request: AxiosOverload = Axios.create({
  baseURL: '/service',
  timeout: 30000,
})

request.interceptors.request.use(
  (config) => {
    const name: string = R.pathOr('', ['meta', 'name'], config)
    loading$.next(updateStore(name, { loading: true }))
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

const targets = [request]

R.map(
  (target) =>
    target.interceptors.response.use(
      (response): AxiosResponse['data'] => {
        const name: string = R.pathOr('', ['config', 'meta', 'name'], response)
        loading$.next(updateStore(name, { loading: false }))

        const reject = function () {
          return Promise.reject({
            status: response.status,
            code: R.pathOr(0, ['data', 'code'], response),
            message: R.pathOr('', ['data', 'message'], response),
          })
        }

        if (response.status === 200) {
          return Object.assign({ meta: { loaded: true } }, R.defaultTo([], response))
        } else {
          return reject()
        }
      },
      (error) => {
        return Promise.reject(error)
      }
    ),
  targets
)
