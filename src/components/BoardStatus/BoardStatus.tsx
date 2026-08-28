import './BoardStatus.css'

type BoardStatusProps = {
  type: 'loading' | 'empty' | 'error'
  message?: string
}

export default function BoardStatus({ type, message }: BoardStatusProps) {
  if (type === 'loading') {
    return <p className="board-status">게시글을 불러오는 중입니다...</p>
  }

  if (type === 'empty') {
    return (
      <div className="board-status board-status--empty">
        <p>아직 게시글이 없습니다.</p>
        <p>첫 번째 글을 작성해보세요.</p>
      </div>
    )
  }

  return (
    <p className="board-status board-status--error">
      {message ?? '게시글을 불러오지 못했습니다.'}
    </p>
  )
}
