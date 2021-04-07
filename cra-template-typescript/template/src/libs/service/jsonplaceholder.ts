import { Service } from '../../types/service'
import { request } from '../request'
import { injectMetaName } from '../shared'

export const jsonplaceholder: Service = {
  getAllPosts: () => request.get('/posts', injectMetaName('getAllPosts')),
  getPostsById: (id) => request.get('/posts/' + id, injectMetaName('getPostsById')),
}
