import { constantCase } from 'constant-case'
import * as R from 'ramda'
import { useEffect, useRef, useState } from 'react'

import { ServiceRequest } from '../../types/service'
import { loading$ } from '../subscription'

type Target = ServiceRequest | Record<string, string>

export function useRequestLoading(target: Target): boolean {
  const [loading, updateLoading] = useState(true)
  const prevLoadingState = useRef(true)

  useEffect(() => {
    const loadingSubscribe = loading$.subscribe((store) => {
      const currentState = R.pathOr(false, [constantCase(target.name), 'loading'], store)
      if (prevLoadingState.current !== currentState) {
        prevLoadingState.current = currentState
        updateLoading(currentState)
      }
    })

    return () => loadingSubscribe.unsubscribe()
  })

  return loading
}
