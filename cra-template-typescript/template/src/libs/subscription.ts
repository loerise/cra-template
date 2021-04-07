import { Subject } from 'rxjs'

type Store = Record<string, unknown>

export const store: Store = {}

export const loading$ = new Subject()

export const updateStore = (key: string, value: unknown): Store => {
  if (!store[key]) store[key] = {}

  store[key] = value
  return store
}
