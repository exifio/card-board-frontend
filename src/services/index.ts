import { createApiPostService } from './apiPostService'
import { createLocalPostService } from './localPostService'
import type { PostService } from './postService'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()

export const postService: PostService = apiBaseUrl
  ? createApiPostService(apiBaseUrl)
  : createLocalPostService()

export const isUsingApi = Boolean(apiBaseUrl)
