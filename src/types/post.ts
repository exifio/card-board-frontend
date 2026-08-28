export type Post = {
  id: number
  title: string
  content: string
  created_at: string
  updated_at: string
}

export type PostFormValues = {
  title: string
  content: string
}

export type CreatePostInput = PostFormValues
export type UpdatePostInput = PostFormValues
