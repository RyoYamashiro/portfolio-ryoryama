# headless-sample

Next.js（App Router）とReactで「記事を保存する → APIで取り出す → 画面に出す」を学ぶ、ローカル専用のヘッドレスCMS教材です。
閲覧画面・管理画面・APIをすべてNext.jsで動かします。

## 起動

Node.js 22以上を用意します。

```sh
npm install
npm run dev
```

- 閲覧画面：<http://127.0.0.1:3000>
- 管理画面：<http://127.0.0.1:3000/admin>
- 公開API：<http://127.0.0.1:3000/api/posts>

停止は `Ctrl+C`。開発中はファイルの変更が自動反映されます。
ポートが使用中なら `PORT=3001 npm run dev` で起動し、URLも3001にします。

ビルドしたアプリを動かす場合：

```sh
npm run build
npm start
```

`npm start` には事前のビルドが必要です。旧版の `node server.js` は使用しません。

## まず試すこと

1. 閲覧画面で記事を開く。
2. 管理画面でタイトルを変更して保存し、閲覧画面を再読み込みする。
3. 新しい記事を下書きで保存し、閲覧画面に出ないことを確認する。
4. 公開に切り替え、再読み込みすると表示されることを確認する。

## 構成

```text
app/
├── layout.jsx              # 共通HTML・メタ情報
├── page.jsx                # 記事一覧 /
├── posts-view.jsx          # Reactで公開APIの結果を表示
├── api-client.js           # ブラウザからAPIを呼ぶ共通処理
├── posts/[id]/page.jsx     # 記事詳細 /posts/:id
├── post.html/page.jsx      # 旧URLから記事詳細へ転送
├── admin/
│   ├── page.jsx            # 管理画面 /admin
│   └── editor.jsx          # 作成・編集・削除フォーム
├── api/[...path]/route.js   # 公開・管理APIのRoute Handler
├── error.jsx               # 画面エラー時の表示
└── not-found.jsx           # 存在しないページ
cms/
├── api.js                  # 公開範囲・入力検証・API応答
└── posts.js                # JSONファイルへの保存
data/
├── seed.json               # 初回の見本記事
└── posts.json              # 保存済み記事（Git管理対象外）
test/api.test.js            # Next.jsを起動する結合テスト
docs/                      # 処理の説明・比較・学習順
```

`.jsx` はReactの画面を書くJavaScriptです。`.js` もNext.jsで使用します。
画面は `app/` のページに移行済みで、独立したHTMLファイルや自作HTTPサーバーはありません。
`app/post.html/` は旧URL互換のルート名で、HTMLファイルではありません。
CSSは加えず、元のシンプルな表示を維持しています。

## HTML版からの読み替え

| やりたいこと | 今の編集場所・操作 |
| --- | --- |
| ページの見出しや構造を変える | `app/page.jsx` などのJSXを編集 |
| 全ページ共通のHTMLやメタ情報を変える | `app/layout.jsx` を編集 |
| 取得した記事の表示を変える | `app/posts-view.jsx` を編集 |
| 管理フォームを変える | `app/admin/editor.jsx` を編集 |
| APIの処理を変える | `app/api/[...path]/route.js` を入口に、`cms/api.js` を編集 |
| 画面を確認する | `npm run dev` で起動してブラウザからアクセス |

HTMLファイルを直接開く手順ではなく、Next.jsを起動して確認します。
JSXではHTMLに似たタグを書き、`{...}` の中にJavaScriptの値や式を入れます。
記事の内容は管理画面で、画面の構造はJSXで変更します。

## 記事の保存

既存の `data/posts.json` をそのまま利用し、再起動後も記事を保持します。
保存先がない場合だけ `data/seed.json` をコピーします。見本に戻す場合は、停止後に `posts.json` を別名へバックアップしてから再起動してください。
APIはキャッシュせず、閲覧画面の再読み込みで最新の記事を取得します。

これは認証のないローカル学習用教材です。起動コマンドは `127.0.0.1` に限定しています。
JSON保存は単一プロセス・少量データ向けです。外部公開する場合は認証・権限管理と既存CMSまたはDBが必要です。

## テストと学習資料

`npm test` はビルド後にNext.jsを起動し、記事の作成・公開・非公開・削除、入力検証、再起動後の保持、画面とAPIを確認します。
一時フォルダのデータを使うため、保存済みの記事は変更しません。

読む順番：[処理の説明](01-how-it-works.md) → [WordPressとの比較](02-wordpress.md) → [学習順](03-small-steps.md)。

Next.jsの構成は公式の[App Router](https://nextjs.org/docs/app)と[Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers)に沿っています。
