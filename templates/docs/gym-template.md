# ジムテンプレートの編集ガイド

## 3つの場所を使い分ける

1. **内容**を変える → `content/gym/`
2. **HTMLの構造や動き**を変える → `components/gym/`
3. **色・余白・配置**を変える → `styles/gym/`

ページ全体の並びは `app/gym/page.jsx` に書いてあります。`<HeroSection />` はメインビジュアル、`<CoursesSection />` は料金セクション、という対応です。
ファイル名をたどれば、その部分だけを編集できます。細かい見出し・文章まで汎用コンポーネントにせず、各セクションに素直なJSXで残しています。

## コンポーネント一覧

| ファイル              | 役割                     | 内容の編集場所            |
| --------------------- | ------------------------ | ------------------------- |
| `HeroSection.jsx`     | メインビジュアル         | 同じファイル              |
| `FeaturesSection.jsx` | 選ばれる理由の切り替え   | `content/gym/features.js` |
| `CoursesSection.jsx`  | コース・料金             | `content/gym/courses.js`  |
| `TrainersSection.jsx` | トレーナー選択           | `content/gym/trainers.js` |
| `FlowSection.jsx`     | ご利用の流れ             | 同じファイル              |
| `VoicesSection.jsx`   | お客様の声と横スクロール | `content/gym/voices.js`   |
| `FaqSection.jsx`      | よくある質問             | `content/gym/faqs.js`     |
| `BlogSection.jsx`     | サンプル記事とダイアログ | `content/gym/posts.js`    |
| `ContactSection.jsx`  | 予約の呼びかけとデモ     | 同じファイル              |

## 例：料金を変える

`content/gym/courses.js` の対象プランの `price` を変えます。

```js
"price": "96,000"
```

`円〜` は表示コンポーネントが付けるため、データには書きません。
`title` はプラン名、`description` は説明、`tags` は短い特徴です。
項目を追加するときは配列内のオブジェクトをコピーし、タイトルを重複させないでください。

## 例：写真を差し替える

`public/images/gym/` に写真を置き、データ内の `image`（特徴のみ `img`）を変更します。

```js
"image": "/images/gym/your-photo.webp",
"alt": "トレーナーがスクワットの姿勢を指導する様子"
```

URLには `public` を含めません。ヒーローと予約背景は `styles/gym/sections.css` の `background-image` で指定します。
トレーナーのメイン写真のaltは名前から生成し、選択用の小さな写真は装飾扱いにしています。

## 例：FAQを増やす

`content/gym/faqs.js` に `{ question, answer }` の組を追加します。
最初の3件を表示し、4件目以降は「すべての質問を見る」で表示します。
文章内で改行を指定できる項目（特徴のタイトル・トレーナーの説明・口コミの見出し・ブログタイトルなど）は `\n` を使います。HTML文字列は使いません。

## CSSを変更するとき

`index.css` が `base.css` → `sections.css` → `effects.css` → `responsive.css` の順に読み込みます。
`responsive.css` には元テンプレート後半の上書き調整も含みます。PC側を編集しても反映されない場合は、同じクラスの上書きがないか検索してください。

基本色は `base.css` の `.gym-site` 内の `--teal`、文字色は `--ink`、横幅は `--shell` です。
既存CMSの画面へ影響しないよう、各CSSには `:where(.gym-site)` が付いています。新しいルールにも同じ接頭辞を付けます。
`responsive.css` の主な境界は700px（スマホ）・980px（タブレット）です。

元の見た目は3コース・3トレーナー・4特徴を中心に設計されています。件数を大きく増減する場合は、データに加えてカードの列数・選択時の幅も確認してください。

## React / Next.jsの最小限の読み方

- `.jsx` はHTMLに似たタグとJavaScriptを一緒に書くファイルです。
- `className` はHTMLの `class`、`{...}` は変数や計算結果を表示する部分です。
- `.map()` は配列の件数分だけカードなどを表示します。
- `useState` は「今どれが選ばれているか」「開いているか」を記憶します。
- `"use client"` はクリックやブラウザAPIを使うコンポーネントに付けています。初期の本文もHTMLとして出力されます。
- `app/gym/page.jsx` はトップページの組み立て担当です。ルート `/` は `/gym` へ転送します。
- `ui/DemoDialog.jsx` は開閉、`ui/Icon.jsx` はアイコン、`ui/Brand.jsx` は共通ロゴ表記を担当します。
- `ui/RevealEffects.jsx` はスクロール演出だけを担当します。データの取得・記事の書き換えはしません。

元の `script.js` は読み込みません。DOMの書き換えとReactの更新が競合しないよう、操作はコンポーネント内に移しています。

## 手動確認のポイント

- PCとスマホ幅で、全9セクションの文章・写真が表示される。
- 特徴の前後・サムネイル、コースの前後、トレーナーの選択と左右キーが動く。
- 口コミの最後まで矢印・ドット・横スクロールで到達できる。
- FAQの開閉と追加表示が動く。
- ブログ・予約のダイアログを閉じるボタンやEscで閉じ、再度開ける。
- モバイルメニューの開閉、リンク選択、Escによる閉じが動く。
- OSで動きを減らす設定にした場合も本文が表示される。

SEO全体の公開基準はルートの [SEO_COMMON_CHECKLIST.md](../SEO_COMMON_CHECKLIST.md) を確認します。

## テーマカラーの簡易プレビュー

右下の固定パレットでオリジナル・黄色・赤・青・ピンク・緑を切り替えられます。
「テーマカラー」を押すと折りたたみ、「元に戻す」で初期色へ戻ります。
現在は画面内だけのプレビューで、再読み込みすると初期色に戻ります。CMSへの保存はまだ行いません。

色の候補は `content/gym/themes.js`、パレットの操作は `components/gym/ThemePreview.jsx`、
パレット自体の見た目は `styles/gym/palette.css` で管理します。
`accent` は見出し・リンク、`start` / `end` はボタン背景、`foreground` はボタン文字色です。

## CMSで更新する場合

`/gym` はmicroCMSに対応しています。[STELLAのCMS設定ガイド](stella-microcms-setup.md) を参照してください。接続後はジム名・トップ画像と文章・料金・トレーナー・FAQ・予約先・SEO情報をCMSで編集します。上記データファイルは未接続時のデモ用で、その他の固定セクションは引き続きファイルで編集します。
