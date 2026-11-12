# 処理の流れ、ここだけつかも〜💅

## ヘッドレスって何？

CMSは「記事などのコンテンツを管理する仕組み」。ヘッドレスは、管理する側と表示する側を分ける考え方だよ。
ここでいう「ヘッド」は読者向けの表示部分。管理画面がないって意味じゃないの！

この教材では1つのNext.jsアプリで閲覧画面・管理画面・APIを動かすけど、記事の受け渡しはAPI経由。
別々のサーバーじゃなくても、この役割分担は学べるよ〜。

```text
記事を書く人 → 管理画面 → 管理API → JSONに保存
                                    ↓
記事を読む人 ← 閲覧画面 ← 公開API ← 公開記事だけ取得
```

APIは「データの受け渡し窓口」、JSONは「データを文字で表す形式」くらいの理解からでOK！

## Next.jsでは、どこに何を書くの？

HTML版でページに書いていた見出しやフォームは、今は `app/` の `.jsx` に書くよ。
Reactは画面をコンポーネントに分けて組み立て、Next.jsはページのURLやAPIの入口を用意しているの。

- `page.jsx`：そのURLで表示するページ。`app/page.jsx` なら `/` だよ。
- `layout.jsx`：各ページで共通に使う枠。今回は `<html>` と `<body>` もここ。
- `posts-view.jsx`・`admin/editor.jsx`：先頭に `'use client'` があり、ブラウザで記事取得やフォーム操作を行うよ。
- `api/[...path]/route.js`：サーバー側のAPIの入口。ここから `cms/` の処理を呼ぶよ。

今回の記事取得は、ブラウザで `useEffect` が動いてからAPIへ問い合わせる方式。
Next.jsを使っているけど、記事本文を最初からサーバーでHTMLに埋め込む実装にはしていないよ。

## まず、記事1つの形を見よ！

```json
{
  "id": "hello-headless",
  "title": "はじめてのヘッドレスCMS",
  "body": "ここに本文が入るよ。",
  "status": "published"
}
```

| 項目 | 意味 |
| --- | --- |
| `id` | 記事を区別する番号代わりの文字列。新規作成時にサーバーで発行 |
| `title` | タイトル。1〜100文字 |
| `body` | 本文。1〜10,000文字。今回はHTMLやMarkdownではなく普通の文字 |
| `status` | `draft` は下書き、`published` は公開 |

空白だけのタイトルや本文は保存できないよ。項目を決めたこの形が「コンテンツモデル」の最初の一歩！

## 読む流れ：最初は3ファイルだけ！

1. `app/page.jsx`：記事一覧ページからReactの `PostList` を呼び出すよ。
2. `app/posts-view.jsx`：`PostList` が `usePosts` を呼び、`useEffect` で記事取得を始めるよ。
3. `app/api-client.js`：`request()` 内の `fetch` で `/api/posts` に問い合わせるよ。

取得できたら `posts-view.jsx` の状態（`useState`）を更新して、Reactが記事を `map` で1件ずつリンクにするよ。

中心になるコードはこれ！ 実物では通信エラーの確認も足してあるよ。

```js
const response = await fetch('/api/posts');
const posts = await response.json();
```

`await` は処理の完了を待つ書き方。`response.json()` は返ってきたJSONをJavaScriptで扱えるデータに変えるの。
記事をクリックすると `/posts/hello-headless` に移動して、そのIDの記事だけ取り出すよ。
JSXには記事の本文を直書きしていないから、CMSで変えた内容を次の取得で表示できるってわけ！

## 書く流れ：次の3ファイル！

1. `app/admin/editor.jsx`：フォームから `title`・`body`・`status` を読み、APIに送る。
2. `cms/api.js`：入力を検証して、作成か更新かを選ぶ。
3. `cms/posts.js`：`data/posts.json` に保存する。

作成は `POST`、更新は `PUT`、削除は `DELETE`。読むときは `GET` だよ！
保存が成功したら管理画面の一覧を取り直すよ。別タブの閲覧画面は自動更新しないから、再読み込みしてね。

## APIの早見表だよ〜

| メソッド | URL | 役割 |
| --- | --- | --- |
| GET | `/api/posts` | 公開記事の配列 |
| GET | `/api/posts/:id` | 公開記事1件 |
| GET | `/api/admin/posts` | 下書きを含む記事の配列 |
| GET | `/api/admin/posts/:id` | 下書きを含む記事1件 |
| POST | `/api/admin/posts` | 作成 |
| PUT | `/api/admin/posts/:id` | タイトル・本文・状態をまとめて更新 |
| DELETE | `/api/admin/posts/:id` | 削除 |

`:id` は実際の記事IDに置き換える目印だよ。`PUT` は今回、3項目を全部送る約束！
作成・更新は `Content-Type: application/json` を付けて、ID以外の3項目をJSONで送るよ。

成功は取得・更新・削除が `200`、作成が `201`。
入力エラーは `400`、別サイトからの操作などは `403`、記事なしは `404`、未対応の操作は `405`、JSON以外での送信は `415` だよ。
エラー本文は `{"message":"理由"}` という形。

## 下書きの扱いが大事！

`cms/api.js` のこの行を見てみてね。

```js
const posts = store.list().filter((post) => isAdmin || post.status === 'published');
```

公開APIには公開記事だけ渡すよ。画面上で下書きを消すだけだと、受信したデータには残っちゃうの。
下書きのIDを知っていても、公開APIで詳細を開くと `404` になるよ！
ただしこの教材の管理APIはログインなし。**公開APIの絞り込みと、管理APIの認証は別の話**って覚えよ。

## 今は読み飛ばしてOKなところ

Next.jsのApp RouterがURLを振り分けるよ。`app/page.jsx` は `/`、`app/admin/page.jsx` は `/admin`、`app/posts/[id]/page.jsx` は記事詳細。
`app/api/[...path]/route.js` はAPIの入口で、`cms/api.js` に処理を渡すよ。保存用JSONは公開フォルダに置かず、サーバー側だけで読み書きするよ。
Host・Originの確認は、別サイトからローカル教材を勝手に操作されにくくする補助。ログインの代わりではないよ。

`posts.js` の同期ファイル操作は、小さな1プロセスの教材で流れを追いやすくするため。
アクセスが増えると他の処理を待たせるし、複数プロセスで同じファイルを更新する使い方にも向かないよ。販売版では既存CMSやDBへ進も！

## 外部CMSへ替えるときの考え方

いまの `app/api-client.js` の `request()` は、画面とデータ取得の境目だよ。
将来も画面に渡す記事を `{ id, title, body, status }` にそろえると、画面を大きく書き直さずに済みやすいの。

```text
閲覧画面 → 自分のサーバーAPI → 外部CMS
                            （秘密のAPIキーはここ）
```

外部CMSの返却形式はサービスごとに違うから、サーバーで今の形に変換しよう。
APIキーをブラウザで動くコンポーネントに置かないのが、この教材からの移行方針！ 外部CMSの認証・権限・公開条件は、そのサービスの公式仕様で確認してね。
まだ外部CMS接続は実装していないよ。ここまでの「窓口を分ける」理解だけで次に進めるからね！
