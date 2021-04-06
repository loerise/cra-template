import { AxiosRequestConfig } from 'axios'
import { constantCase } from 'constant-case'

import { ExtendAxiosRequestConfig } from '../../types/service'

export function injectMetaName(name: string, config: AxiosRequestConfig = {}): ExtendAxiosRequestConfig {
  return Object.assign(config, { meta: { name: constantCase(name) } })
}
