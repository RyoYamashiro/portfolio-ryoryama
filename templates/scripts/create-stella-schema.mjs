import { writeFileSync } from "node:fs";
import { site } from "../content/gym/site.js";
import { copy } from "../content/gym/copy.js";
import { courses } from "../content/gym/courses.js";
import { trainers } from "../content/gym/trainers.js";
import { faqs } from "../content/gym/faqs.js";

const field = (
  fieldId,
  name,
  kind = "text",
  required = false,
  description = "",
  initialValue,
) => ({
  fieldId,
  name,
  kind,
  required,
  description,
  ...(initialValue !== undefined ? { initialValue } : {}),
});
const initial = { ...site, ...copy, bookingUrl: "" };
const labels = {
  name: ["ジム名", "80文字以内。ヘッダー・本文・フッターに表示します。"],
  subtitle: ["ロゴ下の説明", "80文字以内。ジム名の下の短い説明です。"],
  phone: ["電話番号", "80文字以内。サイト上部に表示します。"],
  hours: ["受付時間", "200文字以内。電話番号の下に表示します。"],
  title: [
    "検索・共有用タイトル",
    "200文字以内。検索結果やブラウザのタブに使用します。",
  ],
  description: ["検索・共有用の説明", "500文字以内。ジムの紹介文です。"],
  heroTitle: [
    "トップの見出し",
    "200文字以内。サイトの最初に表示します。改行できます。",
  ],
  heroBody: [
    "トップの説明",
    "4000文字以内。ジム名に続けて表示します。改行できます。",
  ],
  contactTitle: [
    "予約エリアの見出し",
    "200文字以内。サイト下部の予約案内です。",
  ],
  bookingUrl: [
    "予約ページURL",
    "https://から始まる予約先。空欄ならデモ案内を表示します。",
  ],
};
const requiredIds = [
  "name",
  "title",
  "description",
  "heroTitle",
  "contactTitle",
];
const apiFields = Object.entries(labels).map(([id, [name, description]]) =>
  field(
    id,
    name,
    ["description", ...Object.keys(copy)].includes(id) ? "textArea" : "text",
    requiredIds.includes(id),
    description,
    initial[id],
  ),
);
apiFields.push(
  field(
    "heroImage",
    "トップの写真",
    "media",
    false,
    "未設定ならデモ写真を表示します。実店舗の写真に差し替えてください。",
  ),
);
apiFields.push(
  field(
    "heroAlt",
    "トップの写真の説明",
    "text",
    false,
    "写っている内容を300文字以内で入力します。",
    "トレーニング風景",
  ),
);
const courseFields = [
  field("title", "プラン名", "text", true, "80文字以内。"),
  field("description", "プランの説明", "textArea", false, "2000文字以内。"),
  field(
    "price",
    "月額料金（円〜）",
    "number",
    true,
    "税込・税別などの料金条件はプランの説明に記入してください。数字だけで0〜10000000の整数を入力します。",
  ),
  field(
    "tags",
    "特徴のタグ",
    "textArea",
    false,
    "1行1項目、5項目以内、合計500文字以内。例：初心者向け。",
  ),
  field(
    "image",
    "プランの写真",
    "media",
    false,
    "未設定ならデモ写真を表示します。",
  ),
  field("alt", "写真の説明", "text", false, "300文字以内。"),
];
const trainerFields = [
  field(
    "name",
    "名前",
    "text",
    true,
    "80文字以内。実際の担当者の名前を入力してください。",
  ),
  field("englishName", "名前の英字表記", "text", false, "100文字以内。"),
  field(
    "qualification",
    "資格・専門分野",
    "textArea",
    false,
    "500文字以内。確認できる実際の情報のみ入力します。",
  ),
  field("description", "紹介文", "textArea", false, "4000文字以内。"),
  field(
    "image",
    "プロフィール写真",
    "media",
    false,
    "未設定ならデモ人物の写真を表示します。公開前に本人の写真へ変更してください。",
  ),
];
const faqFields = [
  field("question", "質問", "text", true, "300文字以内。"),
  field("answer", "回答", "textArea", true, "4000文字以内。改行できます。"),
];
const customFields = [];
for (const [id, name, fields, min, max] of [
  ["courses", "料金プラン", courseFields, 1, 3],
  ["trainers", "トレーナー", trainerFields, 1, 3],
  ["faqs", "よくある質問", faqFields, 0, 30],
]) {
  apiFields.push({
    ...field(
      id,
      name,
      "repeater",
      min > 0,
      `${min}〜${max}件。上から順に表示します。`,
    ),
    customFieldIds: [id],
    repeaterCountLimitValidation: { repeatCount: { min, max } },
  });
  customFields.push({
    fieldId: id,
    name,
    fields,
    fieldOrderByColumn: [fields.map((f) => f.fieldId)],
  });
}
const example = {
  ...initial,
  courses: courses.map(({ image, ...course }) => ({
    ...course,
    fieldId: "courses",
    price: Number(course.price.replaceAll(",", "")),
    tags: course.tags.join("\n"),
  })),
  trainers: trainers.map(({ image, ...trainer }) => ({
    ...trainer,
    fieldId: "trainers",
  })),
  faqs: faqs.map((faq) => ({ ...faq, fieldId: "faqs" })),
};
for (const [name, data] of [
  ["schema", { apiFields, customFields }],
  ["content-example", example],
]) {
  writeFileSync(
    `docs/microcms/gym-${name}.json`,
    JSON.stringify(data, null, 2) + "\n",
  );
}
console.log("STELLAのスキーマ・入力例を生成しました");
