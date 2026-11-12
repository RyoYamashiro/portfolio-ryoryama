'use client';
import { useEffect, useState } from 'react';
import { request, errorMessage } from './api-client';

function usePosts(path) {
  const [state, setState] = useState({ data: null, message: '読み込み中です。' });
  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, message: '読み込み中です。' });
    request(path, { signal: controller.signal })
      .then(data => setState({ data, message: '' }))
      .catch(error => {
        if (!controller.signal.aborted) setState({ data: null, message: errorMessage(error) });
      });
    return () => controller.abort();
  }, [path]);
  return state;
}
export function PostList() {
  const { data: posts, message } = usePosts('/api/posts');
  return <><p role="status">{message || (posts?.length === 0 ? '公開記事はまだありません。' : '')}</p>
    <ul>{posts?.map(post => <li key={post.id}><a href={`/posts/${encodeURIComponent(post.id)}`}>{post.title}</a></li>)}</ul>
    <noscript>記事の表示にはJavaScriptを有効にしてください。</noscript></>;
}
export function PostDetail({ id }) {
  const { data: post, message } = usePosts(`/api/posts/${encodeURIComponent(id)}`);
  useEffect(() => { if (post) document.title = `${post.title} | Headless Sample`; }, [post]);
  return <><p role="status">{message}</p>{post && <article><h1>{post.title}</h1>
    {post.body.split('\n').map((line, index) => <p key={index}>{line}</p>)}</article>}
    <noscript>記事の表示にはJavaScriptを有効にしてください。</noscript></>;
}
