# Card Board Frontend

카드 게시판 React 프론트엔드입니다.

## 기술 스택

- React + Vite + TypeScript

## 로컬 실행 (독립 모드)

환경변수 없이 실행하면 **로컬 모드**로 동작합니다.  
데이터는 브라우저 `localStorage`에 저장됩니다.

```bash
npm install
npm run dev
```

## API 연결 모드

백엔드와 연결하려면 `.env` 파일을 만듭니다.

```bash
cp .env.example .env
```

```text
VITE_API_BASE_URL=http://localhost:3000
```

연결 방법: [`CONNECTION.md`](./CONNECTION.md)

## 포함 기능

- 게시글 카드 목록 (반응형)
- 작성 / 수정 / 삭제 폼
- Loading / Empty / Error 상태
- API 서비스 레이어 (`src/services/`)

## 데이터 흐름

```text
React → REST API → Supabase
```

Supabase Secret key는 프론트에 넣지 않습니다.
