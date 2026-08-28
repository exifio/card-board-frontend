import type { Post } from '../types/post'

const STORAGE_KEY = 'card-board-posts'

export const DEFAULT_POSTS: Post[] = [
  {
    id: 1,
    title: '첫 번째 게시글',
    content: '풀스택 실습을 시작합니다. 임시 데이터로 카드 레이아웃을 확인합니다.',
    created_at: '2026-08-28T00:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 2,
    title: '두 번째 게시글',
    content: 'PC에서는 3열, 태블릿에서는 2열, 모바일에서는 1열로 보여야 합니다.',
    created_at: '2026-08-27T00:00:00.000Z',
    updated_at: '2026-08-27T00:00:00.000Z',
  },
  {
    id: 3,
    title: '세 번째 게시글',
    content: 'DESIGN-SYSTEM의 색상과 간격을 그대로 사용해 깔끔한 카드 게시판을 만듭니다.',
    created_at: '2026-08-26T00:00:00.000Z',
    updated_at: '2026-08-26T00:00:00.000Z',
  },
]

type StoredPosts = {
  posts: Post[]
  nextId: number
}

function readStorage(): StoredPosts {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return { posts: DEFAULT_POSTS, nextId: 4 }
  }

  try {
    return JSON.parse(raw) as StoredPosts
  } catch {
    return { posts: DEFAULT_POSTS, nextId: 4 }
  }
}

function writeStorage(data: StoredPosts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function sortPosts(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )
}

export function createLocalPostService() {
  return {
    async getPosts() {
      const { posts } = readStorage()
      return sortPosts(posts)
    },

    async createPost(input: { title: string; content: string }) {
      const stored = readStorage()
      const now = new Date().toISOString()
      const newPost: Post = {
        id: stored.nextId,
        title: input.title,
        content: input.content,
        created_at: now,
        updated_at: now,
      }

      writeStorage({
        posts: [newPost, ...stored.posts],
        nextId: stored.nextId + 1,
      })

      return newPost
    },

    async updatePost(id: number, input: { title: string; content: string }) {
      const stored = readStorage()
      const now = new Date().toISOString()
      let updated: Post | null = null

      const posts = stored.posts.map((post) => {
        if (post.id !== id) return post
        updated = { ...post, title: input.title, content: input.content, updated_at: now }
        return updated
      })

      if (!updated) {
        throw new Error('게시글을 찾을 수 없습니다.')
      }

      writeStorage({ ...stored, posts })
      return updated
    },

    async deletePost(id: number) {
      const stored = readStorage()
      const posts = stored.posts.filter((post) => post.id !== id)

      if (posts.length === stored.posts.length) {
        throw new Error('게시글을 찾을 수 없습니다.')
      }

      writeStorage({ ...stored, posts })
    },
  }
}
