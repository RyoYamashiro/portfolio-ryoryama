# STELLA GYM / headless-sample

STELLA GYMのHTML・CSSテンプレートを、Next.jsのコンポーネント構成へ移したプロジェクトです。
トップページはジムサイトのデザインデモ、既存の管理画面・記事APIはCMS学習用として残しています。

## 事業・開発方針

[顧客ペルソナ](docs/gym-personas.md) に、開発・デザイン・営業の軸となる3人の仮説をまとめています。

[今後のタスク一覧](docs/tasks.md) に、直近の作業と簡単モードなどの将来の実装予定をまとめています。

**現在の集中テーマ：** [ジム特化の事業・開発方針](docs/gym-business-plan.md)。完成条件・作業順・今回はやらないことをまとめています。

[事業方針](docs/business-policy.md) に、ターゲット・価格仮説・販売計画・AIへの指示をまとめています。
初期はパーソナルジム向け1商品に集中し、CMS更新・デモ公開・導入手順を含む販売可能な最小構成を目指します。
技術名より顧客のメリットを伝え、料金と運用の透明性を重視します。方針上の予定と、以下の実装済み範囲は区別してください。

相談・作業では、[副社長](docs/roles/vice-president.md)・[Webマーケター](docs/roles/web-marketer.md)・[SNSマーケター](docs/roles/sns-marketer.md)・[エンジニア](docs/roles/engineer.md)・[デザイナー](docs/roles/designer.md) の必要な視点を使います。事業情報は共通の事業方針で管理し、役割別MDには判断の観点をまとめています。

## 起動

追加テンプレート：`/gym-premium` に自然光と石・木の質感を活かした **NAGI PERSONAL GYM** を用意しています。既存のSTELLAは `/gym` です。`/` は `/gym` へ転送します。編集方法は [プレミアムジム編集ガイド](docs/gym-premium-template.md) を参照してください。

Node.js 22以上で実行します。

```sh
npm install
npm run dev
```

<http://127.0.0.1:3000> を開きます。停止は `Ctrl+C` です。

```sh
npm run build   # 公開用ビルドの確認
npm start       # ビルドしたアプリをローカル起動
npm test        # ビルド・入力検証・CMSの結合テスト
```

競技性・達成感を軸にした3つ目のテンプレート **FORGE** は `/gym-forge` です。[編集ガイド](docs/gym-forge-template.md) を参照してください。FORGEはデザインデモで、CMSは未接続です。

## ジムテンプレートのCMS接続

`/gym-premium` はmicroCMSの公開データに対応しています。初期設定・日本語の入力項目・動作確認手順は [CMS設定ガイド](docs/microcms-setup.md) を参照してください。環境変数が未設定ならデモを表示します。実アカウントへの接続と管理画面の操作確認は未実施です。

STELLA `/gym` も別APIで更新できます。[STELLAのCMS設定ガイド](docs/stella-microcms-setup.md) に沿って `gym` APIを作成し、`MICROCMS_STELLA_ENDPOINT=gym` を追加してください。確認コマンドは `npm run cms:check:gym` です。

## まず編集する場所（STELLA）

| 変更したいもの                                    | ファイル・フォルダ                                 |
| ------------------------------------------------- | -------------------------------------------------- |
| セクションの並び                                  | `app/gym/page.jsx`                                     |
| サイト名・電話・トップページのSEO情報             | `content/gym/site.js`                              |
| 特徴・料金・トレーナー・口コミ・FAQ・ブログの内容 | `content/gym/` の各 `.js`                          |
| メインビジュアルの文章                            | `components/gym/sections/HeroSection.jsx`          |
| 各セクションのHTML構造・操作                      | `components/gym/sections/`                         |
| ヘッダー・メニュー / フッター                     | `components/gym/SiteHeader.jsx` / `SiteFooter.jsx` |
| 色・フォント・共通ボタン                          | `styles/gym/base.css`                              |
| セクションごとの見た目                            | `styles/gym/sections.css`                          |
| スマホ・タブレット表示、元デザインの調整ルール    | `styles/gym/responsive.css`                        |
| 表示アニメーション                                | `styles/gym/effects.css`                           |
| 写真                                              | `public/images/gym/`                               |

詳しい編集例は [テンプレート編集ガイド](docs/gym-template.md) を参照してください。
SEOの共通基準は [SEO_COMMON_CHECKLIST.md](SEO_COMMON_CHECKLIST.md) にあります。
設計・実装時は [SEO_DEVELOPMENT_RULES.md](SEO_DEVELOPMENT_RULES.md) も参照します。既存方針との適用関係は同ファイルの冒頭にまとめています。

## 構成

```text
app/gym/page.jsx                  # トップページの組み立てとメタデータ
components/gym/
  SiteHeader.jsx              # ヘッダーとモバイルメニュー
  SiteFooter.jsx              # フッター
  sections/                   # 1セクション = 1ファイル（9セクション）
  ui/                         # ブランド表示・アイコン・ダイアログ・表示演出
content/gym/                  # 差し替える文章・料金・画像パスなど
styles/gym/                   # 整形済みCSS。index.cssが読み込み順を管理
public/images/gym/            # 元テンプレートからコピーしたWebP画像19点
cms/                          # 既存の学習用CMS処理
```

## 今回の範囲と次の作業

- 元デザインのレスポンシブCSSを移植し、トップページ内に適用範囲を限定しています。
- 特徴・コース・トレーナー・口コミの切り替え、FAQの追加表示、モバイルメニュー、ブログ・予約デモをReactで実装しています。
- ページ全体をクライアントコンポーネントにせず、操作が必要なセクションに `"use client"` を付けています。
- トップページのtitle・description・OGP・H1を設定しています。SEOチェックリスト全体の完了を意味するものではありません。
- ルートの追加・整理、ブログのCMS接続、記事詳細へのリンク、予約送信は後の工程です。現在のブログはサンプルダイアログ、予約はデモ表示です。
- 本番URLが決まった段階でcanonical・サイトマップ・robots・OGP画像などを整えます。

## 既存のCMS教材

`/admin`、`/api/posts`、`/posts/[id]` と旧URL互換の処理は残しています。
トップページはジムサイトに変わったため、旧記事一覧コンポーネント `app/posts-view.jsx` の `PostList` は現在トップページでは使いません。
CMS記事の編集はジムサイトのデモデータには反映されません。

教材の操作方法・保存方式は [CMSサンプルの説明](docs/cms-sample.md) を参照してください。
旧説明にある「トップページの記事一覧」「CSSなし」は移行前の状態を指します。

## 素材と公開前の差し替え

元テンプレートは `/Users/user/Downloads/stella-gym-site` です。元ファイルは変更していません。
ジム名、人物名、電話、価格、口コミは仮情報で、人物写真にはAI生成画像を含みます。
実際の情報と利用許諾のある素材へ差し替えてください。
フォントは元テンプレートと同じGoogle Fontsを使用し、通信できない場合はOS標準フォントへ切り替わります。

既存の管理画面・管理APIは認証のないローカル教材のため、本番では既定で無効です。`ENABLE_LOCAL_CMS=true` はローカル検証専用で、公開環境には設定しないでください。
