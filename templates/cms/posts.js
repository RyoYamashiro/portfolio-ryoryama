import { existsSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { join } from 'node:path';

export function createPostStore(file) {
  // 初回だけサンプルをコピーします。次回からは保存済みの記事を使います。
  if (!existsSync(file)) {
    writeFileSync(file, readFileSync(join(process.cwd(), 'data/seed.json')));
  }

  function list() {
    return JSON.parse(readFileSync(file, 'utf8'));
  }

  function save(posts) {
    // 書き込み途中のファイルを読まないよう、完成してから置き換えます。
    writeFileSync(`${file}.tmp`, JSON.stringify(posts, null, 2) + '\n');
    renameSync(`${file}.tmp`, file);
  }

  return {
    list,
    create(input) {
      const post = { id: randomUUID(), ...input };
      save([...list(), post]);
      return post;
    },
    update(id, input) {
      const posts = list();
      const index = posts.findIndex((post) => post.id === id);
      if (index === -1) return null;
      posts[index] = { id, ...input };
      save(posts);
      return posts[index];
    },
    remove(id) {
      const posts = list();
      if (!posts.some((post) => post.id === id)) return false;
      save(posts.filter((post) => post.id !== id));
      return true;
    },
  };
}

export function validatePost(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return '記事はJSONのオブジェクトで送ってください。';
  }
  if (typeof input.title !== 'string' || !input.title.trim() || input.title.length > 100) {
    return 'タイトルは1〜100文字で入力してください。';
  }
  if (typeof input.body !== 'string' || !input.body.trim() || input.body.length > 10000) {
    return '本文は1〜10,000文字で入力してください。';
  }
  if (!['draft', 'published'].includes(input.status)) {
    return '状態はdraftまたはpublishedを指定してください。';
  }
  return null;
}
