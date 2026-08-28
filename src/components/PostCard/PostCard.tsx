import type { Post } from '../../types/post'
import './PostCard.css'

type PostCardProps = {
  post: Post
  onEdit?: () => void
  onDelete?: () => void
}

function formatDate(value: string): string {
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

export default function PostCard({ post, onEdit, onDelete }: PostCardProps) {
  return (
    <article className="post-card">
      <h3 className="post-card__title">{post.title}</h3>
      <p className="post-card__content">{post.content}</p>
      <time className="post-card__date" dateTime={post.created_at}>
        {formatDate(post.created_at)}
      </time>
      <div className="post-card__actions">
        <button type="button" className="post-card__button post-card__button--secondary" onClick={onEdit}>
          수정
        </button>
        <button type="button" className="post-card__button post-card__button--danger" onClick={onDelete}>
          삭제
        </button>
      </div>
    </article>
  )
}
