# NAGI PERSONAL GYM：プレミアムジムテンプレート

URL：`/gym-premium`。既存のSTELLAは `/gym` です。`/` は `/gym` へ転送します。
ユーザー提供の「NAGI パーソナルジムの美しい一日.png」を基に、旧STELLA PRIVATEから刷新しました。

## デザインと構成

自然光、石・木の質感、オフホワイト、オリーブのボタン、日本語の明朝体を使用。
ヒーロー → コンセプト → 特徴 → トレーナー → 料金プラン（1〜3件） → 空間・アクセス → FAQ → 体験予約の順です。
PCは写真と文章が交互に並び、スマホは縦積みになります。画像内の文字を本文として使わず、HTMLで見出し・本文・料金を表示します。

CMS接続後の文章・写真・料金・FAQの編集はmicroCMSで行います。[CMS設定・動作確認ガイド](microcms-setup.md) を参照してください。以下は制作担当者向けです。

## 編集する場所

| 内容 | ファイル |
| --- | --- |
| セクションの並び・メタ情報・フッター | `app/gym-premium/page.jsx` |
| 未接続時のデモ内容・ナビ | `content/gym-premium/site.js` |
| 各セクションの文章と構造 | `components/gym-premium/sections/` |
| ヘッダー・開閉メニュー | `components/gym-premium/Header.jsx` |
| 予約ボタン・デモダイアログ | `components/gym-premium/BookingButton.jsx` |
| 紹介・アクセス用ダイアログ | `components/gym-premium/DetailsDialog.jsx` |
| 配色・余白・レスポンシブ | `styles/gym-premium/index.css` |
| 写真 | `public/images/gym-premium/` |

CSSは `.premium-site` 以下に限定。外部フォントやライブラリは追加していません。
予約URL未設定時はデモ案内、設定後は予約先リンクになります。トレーナー紹介とアクセスはダイアログ、FAQは標準details要素です。

## 画像の制作記録

- `hero.webp`：提供画像のトップ写真を参考に、imagegenで文字なしの写真を1枚生成。プロンプトは `docs/nagi-image-prompt.json`。
- `reception.webp`、`equipment.webp`、`trainer.webp`、`studio.webp`、`leaves.webp`：ユーザー提供画像の写真部分を抽出してWebP化。
- 提供画像は860×1828pxのため、切り出し写真の解像度には限りがあります。本番では同じ構図の高解像度原画への差し替えを推奨します。
- 仮店舗・人物イメージとして使用。公開前に素材の利用条件と実店舗情報を確認してください。

## 公開前の設定・SEO

ブランド・写真・サービス・料金はデモです。実在店舗の所在地・営業時間・プロフィール・予約先・料金条件を設定してください。microCMSの公開データ取得を実装済みです。実アカウント接続は未確認です。予約は外部URLへ誘導し、予約受付・送信機能は持ちません。
本文はサーバーでHTMLを生成し、固有title・description・OGP、H1、画像altを設定。架空店舗のためnoindexとし、架空住所や評価の構造化データは出力しません。
本番化時に正式URL・canonical・サイトマップ・インデックス方針を設定し、GSC・GBP・必要な計測設定を確認します。

検証：ビルド、生成HTMLのメタ情報・H1・ページ内リンク・画像参照を確認。ブラウザ実画面のレスポンシブ・操作確認とCore Web Vitalsは未確認です。
