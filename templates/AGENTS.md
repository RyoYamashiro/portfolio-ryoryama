## このプロジェクトの事業方針

提案・設計・実装・販売文言の作成前に [事業方針](docs/business-policy.md) を参照すること。
ジム特化の開発では [ジム特化の開発方針](docs/gym-business-plan.md) も参照し、現在の範囲と完成条件に沿って進める。
初期はパーソナルジム向け1商品に集中し、1人で開発・営業できる工数と運用負担を優先する。
顧客のメリット、料金・制約の透明性を重視し、不必要な機能追加や過度な設計を避ける。
ユーザーの意見は売れる可能性と実行可能性から評価し、回答は結論ファーストで簡潔にする。
事業目標・価格仮説・未実装の予定を、実績や実装済み機能として扱わない。

## 役割の使い分け

ジム商品の要件・デザイン・開発・集客の判断では [顧客ペルソナ](docs/gym-personas.md) を参照し、誰の困りごとを解決するかを明確にする。人物設定は検証前の仮説として扱う。

着手する作業と将来の実装候補は [タスク一覧](docs/tasks.md) を確認する。候補を確定仕様と混同せず、完了時は関連する完成条件と状態を揃える。

共通の事業方針を読んだうえで、相談内容に必要な役割だけを参照する。

- 優先順位・採算・商品範囲：[副社長](docs/roles/vice-president.md)
- 業界・市場・競合調査、検索動向、LP・購入導線・検索集客：[Webマーケター](docs/roles/web-marketer.md)
- SNS発信・顧客との対話：[SNSマーケター](docs/roles/sns-marketer.md)
- 実装・保守・導入手順：[エンジニア](docs/roles/engineer.md)
- テンプレート制作・画面改修・配色・余白：[デザイナー](docs/roles/designer.md)

テンプレートの新規制作と見た目の変更では、明示的な役割指定がなくてもデザイナーの判断基準を参照する。
実装・改修では、明示的なSEO依頼がなくてもエンジニアの「実装時のSEO確認」と [SEO共通チェックリスト](SEO_COMMON_CHECKLIST.md) を参照し、変更に関連する項目を確認する。
設計・実装のSEO判断には [SEO開発ルール](SEO_DEVELOPMENT_RULES.md) も適用する。冒頭のプロジェクト適用ルールに従い、実装基準と公開確認を使い分ける。

運用ルールは事業方針の「役割別MDの運用」を参照する。事業情報は共通方針に集約し、役割別MDに重複して保持しない。

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
