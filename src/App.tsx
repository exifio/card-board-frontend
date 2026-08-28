import { useCallback, useEffect, useState } from 'react'
import './App.css'
import BoardStatus from './components/BoardStatus/BoardStatus'
import PostCard from './components/PostCard/PostCard'
import PostForm from './components/PostForm/PostForm'
import { isUsingApi, postService } from './services'
import type { Post, PostFormValues } from './types/post'

type LoadState = 'loading' | 'ready' | 'error'

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  const loadPosts = useCallback(async () => {
    setLoadState('loading')
    setErrorMessage('')

    try {
      const data = await postService.getPosts()
      setPosts(data)
      setLoadState('ready')
    } catch (error) {
      setPosts([])
      setLoadState('error')
      setErrorMessage(error instanceof Error ? error.message : '게시글을 불러오지 못했습니다.')
    }
  }, [])

  useEffect(() => {
    void loadPosts()
  }, [loadPosts])

  function openCreateForm() {
    setEditingPost(null)
    setIsFormOpen(true)
  }

  function openEditForm(post: Post) {
    setEditingPost(post)
    setIsFormOpen(true)
  }

  function closeForm() {
    setIsFormOpen(false)
    setEditingPost(null)
  }

  async function handleSubmit(values: PostFormValues) {
    try {
      if (editingPost) {
        await postService.updatePost(editingPost.id, values)
      } else {
        await postService.createPost(values)
      }

      closeForm()
      await loadPosts()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '요청에 실패했습니다.')
      setLoadState('error')
    }
  }

  async function handleDelete(post: Post) {
    const confirmed = window.confirm('게시글을 삭제하시겠습니까?')
    if (!confirmed) return

    try {
      await postService.deletePost(post.id)
      await loadPosts()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '삭제에 실패했습니다.')
      setLoadState('error')
    }
  }

  const showEmptyState = loadState === 'ready' && posts.length === 0

  return (
    <main className="app">
      <header className="board-header">
        <div>
          <h1>Card Board</h1>
          {!isUsingApi && (
            <p className="board-header__mode">로컬 모드 (브라우저 저장)</p>
          )}
        </div>
        <button type="button" className="board-header__create" onClick={openCreateForm}>
          글 작성
        </button>
      </header>

      {isFormOpen && (
        <section className="board-form-panel" aria-label="게시글 작성 폼">
          <PostForm
            key={editingPost?.id ?? 'create'}
            mode={editingPost ? 'edit' : 'create'}
            initialValues={
              editingPost
                ? { title: editingPost.title, content: editingPost.content }
                : undefined
            }
            onSubmit={(values) => void handleSubmit(values)}
            onCancel={closeForm}
          />
        </section>
      )}

      {loadState === 'loading' && <BoardStatus type="loading" />}
      {loadState === 'error' && <BoardStatus type="error" message={errorMessage} />}
      {showEmptyState && <BoardStatus type="empty" />}

      {loadState === 'ready' && posts.length > 0 && (
        <section className="board-grid" aria-label="게시글 목록">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={() => openEditForm(post)}
              onDelete={() => void handleDelete(post)}
            />
          ))}
        </section>
      )}
    </main>
  )
}

export default App
