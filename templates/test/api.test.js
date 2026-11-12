import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';
import { get } from 'node:http';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { setTimeout } from 'node:timers/promises';

test('記事の保存・公開範囲・入力エラーを確認する', async (t) => {
  // 学習中の記事を変更しないよう、一時フォルダでテストします。
  const directory = mkdtempSync(join(tmpdir(), 'headless-sample-'));
  const dataFile = join(directory, 'posts.json');
  let app;
  let base;

  async function start() {
    const probe = createServer();
    probe.listen(0, '127.0.0.1');
    await once(probe, 'listening');
    const port = probe.address().port;
    await new Promise(resolve => probe.close(resolve));
    base = `http://127.0.0.1:${port}`;
    app = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1'], {
      env: { ...process.env, PORT: String(port), POSTS_DATA_FILE: dataFile, NEXT_TELEMETRY_DISABLED: '1', ENABLE_LOCAL_CMS: 'true', MICROCMS_SERVICE_DOMAIN: '', MICROCMS_API_KEY: '', MICROCMS_STELLA_ENDPOINT: '' },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let output = '';
    app.stdout.on('data', chunk => { output += chunk; });
    app.stderr.on('data', chunk => { output += chunk; });
    for (let attempt = 0; attempt < 150; attempt++) {
      if (app.exitCode !== null) throw new Error(output);
      try {
        const response = await fetch(`${base}/api/posts`);
        if (response.ok) return;
      } catch {}
      await setTimeout(100);
    }
    throw new Error(`Next.jsの起動がタイムアウトしました。${output}`);
  }

  async function stop() {
    if (!app || app.exitCode !== null) return;
    const closed = once(app, 'exit');
    app.kill('SIGTERM');
    await closed;
  }

  t.after(async () => {
    await stop();
    rmSync(directory, { recursive: true, force: true });
  });
  await start();

  async function api(path, method = 'GET', body, extraHeaders = {}) {
    const response = await fetch(`${base}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', ...extraHeaders },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return { status: response.status, data: response.headers.get('content-type')?.includes('application/json') ? await response.json() : await response.text() };
  }

  await t.test('公開APIに下書きを含めず、保存ファイルも配信しない', async () => {
    const publicPosts = await api('/api/posts');
    assert.equal(publicPosts.status, 200);
    assert.equal(publicPosts.data.length, 1);
    assert.equal((await api('/api/admin/posts')).data.length, 2);
    assert.equal((await api('/api/posts/my-first-draft')).status, 404);
    assert.equal((await api('/api/posts/missing')).status, 404);
    assert.equal((await api('/data/posts.json')).status, 404);
    assert.equal((await api('/api/posts', 'POST', {})).status, 405);
  });

  const input = { title: '日本語のテスト記事', body: '一行目\n二行目', status: 'draft' };
  let id;
  await t.test('下書き作成→公開→再起動→非公開→削除ができる', async () => {
    const created = await api('/api/admin/posts', 'POST', { ...input, id: 'overwrite' });
    assert.equal(created.status, 201);
    assert.equal(created.data.title, input.title);
    assert.notEqual(created.data.id, 'overwrite');
    id = created.data.id;
    assert.equal((await api(`/api/posts/${id}`)).status, 404);

    const updated = await api(`/api/admin/posts/${id}`, 'PUT', { ...input, status: 'published' });
    assert.equal(updated.status, 200);
    assert.equal((await api(`/api/posts/${id}`)).data.body, input.body);

    await stop();
    await start();
    assert.equal((await api(`/api/posts/${id}`)).data.title, input.title);

    await api(`/api/admin/posts/${id}`, 'PUT', input);
    assert.equal((await api(`/api/posts/${id}`)).status, 404);
    assert.equal((await api(`/api/admin/posts/${id}`, 'DELETE')).status, 200);
    assert.equal((await api(`/api/admin/posts/${id}`)).status, 404);
    assert.equal((await api(`/api/admin/posts/${id}`, 'DELETE')).status, 404);
    assert.equal((await api(`/api/admin/posts/${id}`, 'PUT', input)).status, 404);
  });

  await t.test('不正な入力を保存しない', async () => {
    const before = (await api('/api/admin/posts')).data;
    for (const invalid of [null, [], {}, { ...input, title: ' ' },
      { ...input, title: 'あ'.repeat(101) }, { ...input, body: '' },
      { ...input, body: 'あ'.repeat(10001) }, { ...input, status: 'unknown' }]) {
      assert.equal((await api('/api/admin/posts', 'POST', invalid)).status, 400);
    }
    const malformed = await fetch(`${base}/api/admin/posts`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{broken',
    });
    assert.equal(malformed.status, 400);
    assert.equal((await api('/api/admin/posts', 'POST', input, { 'Content-Type': 'text/plain' })).status, 415);
    assert.deepEqual((await api('/api/admin/posts')).data, before);
  });

  await t.test('別サイトからの書き込みを拒否する', async () => {
    assert.equal((await api('/api/admin/posts', 'POST', input, { Origin: 'https://example.com' })).status, 403);
    // fetchはHostを補正するため、この確認ではHTTPリクエストを直接送ります。
    const status = await new Promise((resolve, reject) => {
      get(`${base}/api/posts`, { headers: { Host: 'example.com' } }, (response) => {
        response.resume();
        resolve(response.statusCode);
      }).on('error', reject);
    });
    assert.equal(status, 403);
  });

  await t.test('Next.jsの画面・配信アセット・旧URLの転送を確認する', async () => {
    for (const path of ['/', '/posts/hello-headless', '/admin', '/admin/']) {
      const response = await fetch(`${base}${path}`);
      assert.equal(response.status, 200, path);
      assert.match(response.headers.get('content-type'), /html/);
      const html = await response.text();
      assert.match(html, /lang="ja"/);
      assert.match(html, /\/_next\/static\//);
      const script = html.match(/src="([^"]+\.js[^"]*)"/);
      assert.ok(script, 'Next.jsのJavaScriptがある');
      assert.equal((await fetch(new URL(script[1].replaceAll('&amp;', '&'), base))).status, 200);
    }
    const response = await fetch(`${base}/post.html?id=hello-headless`, { redirect: 'manual' });
    assert.equal(response.status, 307);
    assert.equal(response.headers.get('location'), '/posts/hello-headless');
    assert.equal((await fetch(`${base}/missing`)).status, 404);
  });
});
