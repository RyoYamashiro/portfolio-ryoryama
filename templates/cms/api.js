import { localCmsEnabled } from './local-access.js';
import { createPostStore, validatePost } from './posts.js';
import { join } from 'node:path';

function sendJson(status, data) {
  return Response.json(data, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
}

async function readJson(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('JSONが必要です。');
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 100000) {
        await reader.cancel();
        throw new Error('入力が大きすぎます。');
      }
      chunks.push(Buffer.from(value));
    }
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

// Next.jsのRoute Handlerから呼び出す入口。保存先はテスト時だけ切り替えます。
export async function handleRequest(request) {
  if (!localCmsEnabled()) return sendJson(404, { message: "APIが見つかりません。" });
  const port = process.env.PORT || '3000';
  const host = request.headers.get('host');
  if (![`localhost:${port}`, `127.0.0.1:${port}`].includes(host)) {
    return sendJson(403, { message: 'ローカルのURLで開いてください。' });
  }
  const origin = request.headers.get('origin');
  if (origin && origin !== `http://${host}`) {
    return sendJson(403, { message: '別のサイトからの操作はできません。' });
  }
  try {
    const store = createPostStore(process.env.POSTS_DATA_FILE || join(process.cwd(), 'data/posts.json'));
    return await handleApi(request, new URL(request.url).pathname, store);
  } catch (error) {
    console.error(error);
    return sendJson(500, { message: 'サーバーでエラーが発生しました。ターミナルを確認してください。' });
  }
}

export async function handleApi(request, pathname, store) {
  const match = pathname.match(/^\/api\/(admin\/)?posts(?:\/([^/]+))?$/);
  if (!match) return sendJson(404, { message: 'APIが見つかりません。' });

  const isAdmin = Boolean(match[1]);
  const id = match[2];
  const method = request.method;

  if (method === 'GET') {
    // 下書きは画面で隠すのではなく、公開APIから返さないようにします。
    const posts = store.list().filter((post) => isAdmin || post.status === 'published');
    if (!id) return sendJson(200, posts);
    const post = posts.find((post) => post.id === id);
    return post
      ? sendJson(200, post)
      : sendJson(404, { message: '記事が見つかりません。' });
  }

  if (!isAdmin || !['POST', 'PUT', 'DELETE'].includes(method)
      || (method === 'POST' && id) || (method !== 'POST' && !id)) {
    return sendJson(405, { message: 'この操作には対応していません。' });
  }

  if (method === 'DELETE') {
    return store.remove(id)
      ? sendJson(200, { message: '削除しました。' })
      : sendJson(404, { message: '記事が見つかりません。' });
  }

  if (request.headers.get('content-type')?.split(';')[0] !== 'application/json') {
    return sendJson(415, { message: 'application/jsonで送ってください。' });
  }

  let input;
  try {
    input = await readJson(request);
  } catch {
    return sendJson(400, { message: 'JSONの形式または入力サイズを確認してください。' });
  }
  const error = validatePost(input);
  if (error) return sendJson(400, { message: error });

  // 保存できる項目だけ取り出します。IDは利用者に変更させません。
  const fields = { title: input.title.trim(), body: input.body.trim(), status: input.status };
  const post = method === 'POST' ? store.create(fields) : store.update(id, fields);
  return post
    ? sendJson(method === 'POST' ? 201 : 200, post)
    : sendJson(404, { message: '記事が見つかりません。' });
}
