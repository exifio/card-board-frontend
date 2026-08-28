import type { CreatePostInput, Post, UpdatePostInput } from '../types/post'

export type PostService = {
  getPosts: () => Promise<Post[]>
  createPost: (input: CreatePostInput) => Promise<Post>
  updatePost: (id: number, input: UpdatePostInput) => Promise<Post>
  deletePost: (id: number) => Promise<void>
}
