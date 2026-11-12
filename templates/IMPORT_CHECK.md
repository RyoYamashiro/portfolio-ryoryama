# headless-sample 取り込み・動作確認

確認日：2026-11-12

## 取り込み

- 取り込み元：`/Users/user/project/headless-sample`
- 配置先：`templates/`（中間ディレクトリを撤去）
- STELLA・NAGI・FORGEを共通のNext.jsアプリのままコピー。デザイン・実装の変更なし。
- ソース、画像、CMS処理、設定例、ロックファイル、テスト、編集資料を保持。
- `.git`、`node_modules`、`.next`、`out`、実環境変数、保存済み記事、OS生成ファイルはコピー対象外。`.env.example` は空の設定例として保持。
- `rsync` のチェックサム比較で、除外項目以外の取り込み元との差分なしを確認。

## 結果

Node.js 22.16.0 / npm 10.9.2。CMSの実認証情報なしのデモモード。

- `npm ci --offline --no-audit --no-fund`：成功。
- `npm run build -- --webpack`：成功。
- `node --test`：14件成功、失敗・スキップなし。CMS公開データの反映・未公開情報の制御・入力検証・API・旧URL転送など既存テストを実行。
- 本番サーバー：`npm start -- --port 3218` で起動。
- `/gym`、`/gym-premium`、`/gym-forge`：すべてHTTP 200。各ページの日本語本文、固有title、単一H1、`lang="ja"` を確認。
- HTMLが参照するローカル画像・CSS・JavaScript等：STELLA 25件、NAGI 15件、FORGE 18件、すべてHTTP 200。
- `/`：`/gym` へ307転送。存在しないページ：404。
- 本番の `/admin`・`/api/admin/posts`：404。ローカル教材の管理機能は本番で既定無効。
- STELLA：Chromeで初期表示を確認。
- `node_modules`・`.next` がGitの除外対象であることを確認。

## 確認の限界

- 最初の `npm test` はTurbopackのビルド中にディスク空き容量不足で停止した。一時キャッシュを削除後、Webpackビルドと既存テストを個別実行して成功した。標準のTurbopackビルドの成功は未確認。
- Chromeの同時操作を検知したため、その後のブラウザ操作を中断。全テンプレートのクリック操作・スマホ実機での表示は今回未確認。
- microCMS実アカウントへの接続は未確認。既存のモック結合テストは成功。FORGEは元のままCMS未接続。
- 予約はデモ。実際の予約送信や外部サービスへの書き込みは確認対象外。
- 公開用URL、canonical、サイトマップ、robots等の公開設定と実データへの差し替えは元資料に従い別途対応する。今回はコピーとローカル動作確認のみ。

## 配置変更

`headless-sample/` の中身を `templates/` 直下へ移動。元のREADMEは `TEMPLATE_GUIDE.md` として保持。アプリ内部の相対配置は変更していない。
