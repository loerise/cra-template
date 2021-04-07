import { filter } from 'ramda'
import { of } from 'rxjs'
import { pluck, switchMap } from 'rxjs/operators'

import { Reducer } from '../../types/service'
import { jsonplaceholder } from '../service'

type DataPost = { userId: number; id: number; title: string; body: string }

export const app: Reducer = {
  getAllPosts: () =>
    jsonplaceholder
      .getAllPosts()
      .pipe(pluck('data'))
      .pipe(switchMap((steam) => of(filter((post: DataPost) => post.userId === 1, steam)))),
}
