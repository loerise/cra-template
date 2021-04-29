import { useEffect, useRef, useState } from 'react'
import { finalize } from 'rxjs/operators'

import { IServiceRequest, ISteam } from '../../types/service'

type IUseRequestOptions = {
  manual?: boolean
  loadingDelay?: number
  params?: any
  onSuccess?: (arg: ISteam) => void
  onError?: (arg: ISteam) => void
}

type IUseRequestReturn = {
  data: ISteam | undefined
  loading: boolean
  run$: IServiceRequest
  run: (...args: unknown[]) => void
}

interface IUseRequest {
  (request: IServiceRequest, options?: IUseRequestOptions): IUseRequestReturn
}

export const useRequest: IUseRequest = (request, options) => {
  const defaultOptions = { manual: true, params: {}, loadingDelay: 200 }

  const [data, updateData] = useState({})
  const [loading, updateLoading] = useState(false)

  const { manual, params, loadingDelay, onSuccess, onError } = Object.assign(defaultOptions, options)

  let loadingDelayTimer: NodeJS.Timeout

  const callback = (steam: ISteam) => {
    if (onSuccess) {
      onSuccess(steam)
      updateData(steam)
    } else {
      updateData(steam)
    }
  }

  const run$ = (...args: unknown[]) => request(...args)

  const run = (...args: unknown[]) => {
    loadingDelayTimer = setTimeout(() => {
      updateLoading(true)
    }, loadingDelay)

    run$(...args)
      .pipe(
        finalize(() => {
          clearTimeout(loadingDelayTimer)
          updateLoading(false)
        })
      )
      .subscribe(
        (steam) => {
          callback(steam)
        },
        (error) => {
          onError && onError(error)
        }
      )
  }

  const runRef = useRef(run)

  useEffect(() => {
    if (!manual) {
      runRef.current(params)
    }
  }, [])

  return {
    data,
    loading,
    run,
    run$,
  }
}
