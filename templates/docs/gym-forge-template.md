# FORGE PERSONAL GYM

URL：`/gym-forge`。STELLA `/gym`、NAGI `/gym-premium` と独立した3つ目のデザインデモです。

ユーザー提供「FORGE パーソナルジム ランディングページ.png」を基に、暗いトレーニング写真、赤いCTA、斜めのコンセプト写真、黒白のセクション、横並びの料金・体験ステップを再現しました。スマートフォンは写真の構図・文字サイズ・情報の順番を調整しています。

## 編集箇所

| 内容 | ファイル |
| --- | --- |
| セクション順・SEO | `app/gym-forge/page.jsx` |
| 料金・プログラム・FAQ・予約URL | `content/gym-forge/site.js` |
| 各セクションの文章・構造 | `components/gym-forge/sections/` |
| メニュー・予約デモ | `components/gym-forge/Header.jsx`、`BookingButton.jsx` |
| 写真の差し替え・切り取り位置 | `components/gym-forge/Photo.jsx` と `content/gym-forge/site.js` の `photos` |
| 配色・余白・PC／スマホ | `styles/gym-forge/index.css` |

見出し・本文・価格・FAQはHTMLで実装しています。写真は独立した素材をNext.js Imageで表示し、画面幅に応じたサイズで配信します。`photos` の `src`・`alt`・任意の `position` で差し替えられます。納品時は実店舗の素材へ変更してください。

## 素材

- `public/images/gym-forge/reference.png`：ユーザー提供画像のコピー。元ファイルは変更していません。デザイン参考用に保持し、ページの写真表示には使用しません。
- `public/images/gym-forge/hero.png`：imagegenの組み込みツールで1枚生成した、文字なしのメイン写真。生成プロンプトは `docs/forge-image-prompt.txt`。
- メイン写真は参考の雰囲気・構図を再制作したため、人物や細部が完全一致するわけではありません。
- 本番利用前に、提供素材の利用・再配布条件と人物・施設の扱いを確認してください。

- 施設・トレーナー・指導写真：`public/images/gym-forge/{facility,trainer,training}.webp`。組み込みimagegenで生成しWebP化。プロンプトは [写真更新記録](forge-image-refresh-prompts.md)。
- 小さな写真枠などには `public/images/gym/` と `public/images/gym-premium/` の既存素材も再利用しています。
- 地図は渋谷駅周辺を表示するGoogleマップiframe。実店舗所在地ではない旨を表示しています。

## 操作と公開条件

- ヘッダーのリンクは該当セクションへ移動します。スマホはメニューを開閉できます。
- FAQは開閉できます。
- 予約URL未設定時はデモ案内を表示し、設定後は予約ページへのリンクになります。
- CMS接続は未実装。既存テンプレートの接続設定は変更しません。
- 架空店舗のためnoindex。住所、人物、資格、料金はダミーと明記。実績や口コミの構造化データは出しません。
- 参考デザインの「一番人気」は裏付けのない順位を避けて「おすすめプラン」とし、料金の初月合計とデモ表記を補足しています。

## 確認結果

2026-10-31：本番ビルド成功。ローカルのPlaywrightで1440px・390px幅の画面を確認し、横はみ出しなし、H1が1つ、予約ダイアログの開閉、FAQの開閉、スマホメニューの移動後の閉鎖、ページ内JavaScriptエラーなしを確認しました。公開環境のCore Web Vitalsは未計測です。
