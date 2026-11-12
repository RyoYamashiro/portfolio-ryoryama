'use client';
export default function ErrorPage({ reset }) {
  return <main><h1>エラーが発生しました。</h1><button onClick={reset}>再試行</button></main>;
}
