import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { normalizeStella } from "../cms/microcms/normalize-stella.js";
const example = JSON.parse(
  readFileSync("docs/microcms/gym-content-example.json", "utf8"),
);

test("STELLAのデモ・公開内容・空欄・0円を区別する", () => {
  assert.equal(normalizeStella(null).site.name, "STELLA GYM");
  const data = normalizeStella({
    ...example,
    phone: "",
    heroBody: "",
    faqs: [],
    courses: [{ ...example.courses[0], price: 0 }],
  });
  assert.equal(data.demo, false);
  assert.equal(data.site.phone, "");
  assert.equal(data.copy.heroBody, "");
  assert.equal(data.courses[0].price, "0");
  assert.deepEqual(data.faqs, []);
});

test("STELLAの必須項目・件数・価格・画像・予約URLを検証する", () => {
  for (const changes of [
    { name: "" },
    { contactTitle: "" },
    { courses: [] },
    { trainers: [] },
    { trainers: Array(4).fill(example.trainers[0]) },
    { faqs: [null] },
    { courses: [{ ...example.courses[0], price: -1 }] },
    { courses: [{ ...example.courses[0], price: "33000" }] },
    {
      courses: [
        { ...example.courses[0], tags: Array(6).fill("タグ").join("\n") },
      ],
    },
    { heroImage: { url: "https://evil.example/image.jpg" } },
    {
      trainers: [
        { ...example.trainers[0], image: { url: "javascript:alert(1)" } },
      ],
    },
    { bookingUrl: "javascript:alert(1)" },
  ])
    assert.throws(() => normalizeStella({ ...example, ...changes }));
});
