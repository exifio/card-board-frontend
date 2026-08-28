import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type { PostFormValues } from '../../types/post'
import './PostForm.css'

type PostFormProps = {
  mode: 'create' | 'edit'
  initialValues?: PostFormValues
  onSubmit: (values: PostFormValues) => void
  onCancel: () => void
}

export default function PostForm({
  mode,
  initialValues,
  onSubmit,
  onCancel,
}: PostFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '')
  const [content, setContent] = useState(initialValues?.content ?? '')
  const [error, setError] = useState('')

  useEffect(() => {
    setTitle(initialValues?.title ?? '')
    setContent(initialValues?.content ?? '')
    setError('')
  }, [initialValues, mode])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()

    if (!trimmedTitle || !trimmedContent) {
      setError('제목과 내용을 모두 입력해주세요.')
      return
    }

    setError('')
    onSubmit({
      title: trimmedTitle,
      content: trimmedContent,
    })
  }

  const submitLabel = mode === 'create' ? '작성' : '수정 완료'

  return (
    <form className="post-form" onSubmit={handleSubmit} noValidate>
      <div className="post-form__field">
        <label htmlFor="post-title">제목</label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="게시글 제목"
        />
      </div>

      <div className="post-form__field">
        <label htmlFor="post-content">내용</label>
        <textarea
          id="post-content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="게시글 내용"
          rows={5}
        />
      </div>

      {error && <p className="post-form__error">{error}</p>}

      <div className="post-form__actions">
        <button type="button" className="post-form__button post-form__button--secondary" onClick={onCancel}>
          취소
        </button>
        <button type="submit" className="post-form__button post-form__button--primary">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
