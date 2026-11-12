'use client';
import { useEffect, useRef, useState } from 'react';
import { request, errorMessage } from '../api-client';

const empty = { title: '', body: '', status: 'draft' };
const endpoint = '/api/admin/posts';
export default function Editor() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(true);
  const [message, setMessage] = useState('読み込み中です。');
  const lock = useRef(false);
  const titleInput = useRef(null);
  useEffect(() => {
    const controller = new AbortController();
    request(endpoint, { signal: controller.signal })
      .then(data => { setPosts(data); setMessage(''); })
      .catch(error => { if (!controller.signal.aborted) setMessage(errorMessage(error)); })
      .finally(() => { if (!controller.signal.aborted) setBusy(false); });
    return () => controller.abort();
  }, []);
  function reset() { setEditingId(null); setInput(empty); }
  async function run(action) {
    if (busy || lock.current) return;
    lock.current = true;
    setBusy(true);
    try { await action(); }
    catch (error) { setMessage(errorMessage(error)); }
    finally { lock.current = false; setBusy(false); }
  }
  function save(event) {
    event.preventDefault();
    run(async () => {
      await request(editingId ? `${endpoint}/${encodeURIComponent(editingId)}` : endpoint,
        { method: editingId ? 'PUT' : 'POST', body: input });
      reset();
      setMessage('保存しました。閲覧画面を再読み込みすると反映されます。');
      setPosts(await request(endpoint));
    });
  }
  function remove(post) {
    if (busy || !window.confirm(`「${post.title}」を削除しますか？`)) return;
    run(async () => {
      await request(`${endpoint}/${encodeURIComponent(post.id)}`, { method: 'DELETE' });
      if (editingId === post.id) reset();
      setMessage('削除しました。');
      setPosts(await request(endpoint));
    });
  }
  function change(event) { setInput({ ...input, [event.target.name]: event.target.value }); }
  return <>
    <h2>{editingId ? '記事を編集' : '新しい記事'}</h2>
    <form onSubmit={save}><fieldset disabled={busy}><legend>記事の内容</legend>
      <p><label htmlFor="title">タイトル（100文字まで）</label><br />
        <input ref={titleInput} id="title" name="title" maxLength={100} required value={input.title} onChange={change} /></p>
      <p><label htmlFor="body">本文（10,000文字まで）</label><br />
        <textarea id="body" name="body" rows={8} cols={40} maxLength={10000} required value={input.body} onChange={change} /></p>
      <p><label htmlFor="status">状態</label><select id="status" name="status" value={input.status} onChange={change}>
        <option value="draft">下書き</option><option value="published">公開</option></select></p>
      <button type="submit">保存</button>{' '}<button type="button" onClick={reset}>新規入力に戻る</button>
    </fieldset></form>
    <p role="status">{message}</p><h2>保存済みの記事</h2>
    {!busy && posts.length === 0 && <p>保存済みの記事はありません。</p>}
    <ul>{posts.map(post => <li key={post.id}>{post.title}（{post.status === 'published' ? '公開' : '下書き'}）{' '}
      <button disabled={busy} onClick={() => { setEditingId(post.id); setInput({ title: post.title, body: post.body, status: post.status }); titleInput.current?.focus(); }}>編集</button>{' '}
      <button disabled={busy} onClick={() => remove(post)}>削除</button></li>)}</ul>
    <noscript>記事の管理にはJavaScriptを有効にしてください。</noscript>
  </>;
}
