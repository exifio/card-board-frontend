import type { Post } from '../types/post'
import type { PostService } from './postService'

type ApiErrorBody = {
  message?: string
}

async function parseJson<T>(response: Response): Promise<T> {
  const text = await response.text()
  if (!text) {
    return {} as T
  }

  try {
    return JSON.parse(text) as T
  } catch {
    return {} as T
  }
}

async function request<T>(baseUrl: string, path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  if (!response.ok) {
    const body = await parseJson<ApiErrorBody>(response)
    throw new Error(body?.message ?? `요청에 실패했습니다 (HTTP ${response.status})`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return parseJson<T>(response)
}

export function createApiPostService(baseUrl: string): PostService {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '')

  return {
    getPosts() {
      return request<Post[]>(normalizedBaseUrl, '/api/posts')
    },

    createPost(input) {
      return request<Post>(normalizedBaseUrl, '/api/posts', {
        method: 'POST',
        body: JSON.stringify(input),
      })
    },

    updatePost(id, input) {
      return request<Post>(normalizedBaseUrl, `/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(input),
      })
    },

    deletePost(id) {
      return request<void>(normalizedBaseUrl, `/api/posts/${id}`, {
        method: 'DELETE',
      })
    },
  }
}
