import { writeFileSync } from "node:fs";
import { site, copy, plans, faqs } from "../content/gym-premium/site.js";
const labels = {
  name: "ジム名",
  label: "ロゴ下の説明",
  title: "検索・共有用タイトル",
  description: "検索・共有用の説明",
  bookingUrl: "予約ページURL（https）",
  heroTitle: "トップの見出し",
  heroBody: "トップの説明",
  conceptTitle: "コンセプト見出し",
  conceptBody: "コンセプト本文",
  featureTitle: "特徴の見出し",
  featureBody: "特徴の本文",
  trainerTitle: "トレーナー見出し",
  trainerBody: "トレーナー本文",
  trainerDetail: "トレーナー詳細",
  studioTitle: "空間の見出し",
  studioBody: "空間の本文",
  address: "住所・アクセス",
  hours: "営業時間・設備",
  priceNote: "料金の注意事項",
  contactTitle: "予約エリア見出し",
  contactBody: "予約エリア本文",
};
const required = new Set(["name", "title", "description", "heroTitle"]);
const text = (
  fieldId,
  name,
  initialValue,
  kind = "text",
  isRequired = false,
) => ({
  fieldId,
  name,
  kind,
  required: isRequired,
  ...(initialValue !== undefined ? { initialValue } : {}),
});
const apiFields = Object.entries({ ...site, ...copy })
  .filter(([key]) => labels[key])
  .map(([key, value]) =>
    text(
      key,
      labels[key],
      value,
      key in copy || key === "description" ? "textArea" : "text",
      required.has(key),
    ),
  );
for (const [key, label] of [
  ["hero", "トップ"],
  ["reception", "受付"],
  ["equipment", "設備"],
  ["trainer", "トレーナー"],
  ["studio", "内観"],
]) {
  apiFields.push({
    fieldId: `${key}Image`,
    name: `${label}の画像`,
    kind: "media",
    required: false,
  });
  apiFields.push(text(`${key}Alt`, `${label}の画像説明`, undefined));
}
apiFields.push({
  fieldId: "plans",
  name: "料金プラン",
  kind: "repeater",
  required: true,
  customFieldIds: ["plan"],
  repeaterCountLimitValidation: { repeatCount: { min: 1, max: 3 } },
});
apiFields.push({
  fieldId: "faqs",
  name: "よくある質問",
  kind: "repeater",
  required: false,
  customFieldIds: ["faq"],
  repeaterCountLimitValidation: { repeatCount: { max: 30 } },
});
const planFields = [
  text("name", "プラン名", undefined, "text", true),
  text("label", "説明", undefined),
  {
    fieldId: "price",
    name: "月額（税込・円）",
    kind: "number",
    required: true,
  },
  text("items", "内容（1行に1項目）", undefined, "textArea", true),
  {
    fieldId: "featured",
    name: "おすすめ表示",
    kind: "boolean",
    required: false,
    initialValue: false,
  },
];
const faqFields = [
  text("question", "質問", undefined, "text", true),
  text("answer", "回答", undefined, "textArea", true),
];
const descriptions = {
  name: "サイト上部と下部に表示するジム名です。80文字以内。",
  label: "ジム名の下に表示する短い説明です。80文字以内。",
  title: "検索結果やブラウザのタブに使うタイトルです。200文字以内。",
  description: "検索結果や共有時に使う紹介文です。500文字以内。",
  bookingUrl:
    "予約ボタンの移動先です。https://から始まるURLを入力。空欄ならデモ案内を表示します。",
  heroTitle: "サイトを開いて最初に見える大きな見出しです。200文字以内。",
  address:
    "空間・アクセスの詳細画面に表示します。住所や最寄り駅を入力してください。",
  hours:
    "空間・アクセスの詳細画面に表示します。営業時間や設備を入力してください。",
  trainerDetail: "トレーナー紹介ボタンを押した後に表示する詳しい紹介です。",
  plans: "1〜3件追加してください。上から順にサイトに表示します。",
  faqs: "質問と回答を最大30件登録できます。上から順にサイトに表示します。",
};
for (const field of apiFields) {
  field.description =
    descriptions[field.fieldId] ??
    (field.kind === "media"
      ? "写真を選んでください。未設定の場合はテンプレートの写真を表示します。"
      : field.fieldId.endsWith("Alt")
        ? "写真に写っている内容を短く説明してください。300文字以内。"
        : `${field.name}として表示します。改行できます。4000文字以内。`);
}
planFields.find((field) => field.fieldId === "price").description =
  "月額の税込金額を半角数字だけで入力します。例：33000。0〜10000000の整数。";
planFields.find((field) => field.fieldId === "items").description =
  "サービス内容を1行に1つ、1〜10項目入力します。全体で2000文字以内。";
planFields.find((field) => field.fieldId === "featured").description =
  "オンにすると、このプランにおすすめの表示を付けます。";
faqFields[0].description =
  "お客様からよく聞かれる質問を300文字以内で入力してください。";
faqFields[1].description =
  "質問への回答を4000文字以内で入力してください。改行できます。";
const schema = {
  apiFields,
  customFields: [
    {
      fieldId: "plan",
      name: "料金プラン",
      fields: planFields,
      fieldOrderByColumn: [planFields.map((x) => x.fieldId)],
    },
    {
      fieldId: "faq",
      name: "質問と回答",
      fields: faqFields,
      fieldOrderByColumn: [faqFields.map((x) => x.fieldId)],
    },
  ],
};
writeFileSync(
  "docs/microcms/gym-premium-schema.json",
  JSON.stringify(schema, null, 2) + "\n",
);
const example = {
  ...site,
  ...copy,
  plans: plans.map((p) => ({
    ...p,
    fieldId: "plan",
    price: Number(p.price.replaceAll(",", "")),
    items: p.items.join("\n"),
  })),
  faqs: faqs.map((f) => ({ ...f, fieldId: "faq" })),
};
writeFileSync(
  "docs/microcms/gym-premium-content-example.json",
  JSON.stringify(example, null, 2) + "\n",
);
console.log("microCMSスキーマ・入力例を生成しました");
