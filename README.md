# Card Board Frontend

카드 게시판 React 프론트엔드입니다.

## 기술 스택

- React
- Vite
- TypeScript

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 으로 접속합니다.

## 데이터 흐름

```text
React → REST API → Supabase
```

React에서 Supabase를 직접 호출하지 않고 REST API를 통해 데이터를 주고받습니다.
