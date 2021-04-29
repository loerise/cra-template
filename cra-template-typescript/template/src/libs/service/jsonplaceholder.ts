import { IService } from '../../types/service'
import { request } from '../request'

export const jsonplaceholder: IService = {
  getAllPosts: () => request.get('/posts'),
  getPostsById: (id) => request.get('/posts/' + id),
}
