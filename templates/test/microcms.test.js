import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fetchGymContent } from "../cms/microcms/client.js";
import { normalizeGym, safeBookingUrl } from "../cms/microcms/normalize.js";
const example = JSON.parse(
  readFileSync(
    new URL(
      "../docs/microcms/gym-premium-content-example.json",
      import.meta.url,
    ),
  ),
);
const published = { ...example, publishedAt: "2026-10-29T00:00:00Z" };
const config = { domain: "test-gym", apiKey: "test-secret" };
test("未接続のみデモ、片方の設定漏れはエラー", async () => {
  assert.equal(await fetchGymContent({}), null);
  assert.equal(normalizeGym(null).site.name, "NAGI");
  await assert.rejects(fetchGymContent({ domain: "test-gym" }));
  await assert.rejects(
    fetchGymContent({ ...config, domain: "evil.test/path" }),
  );
  await assert.rejects(
    fetchGymContent({ ...config, endpoint: "gym?draftKey=secret" }),
  );
});
test("公開データをサーバーGETで取得し更新内容を毎回反映する", async () => {
  let current = {
    ...published,
    name: "動作確認ジム",
    plans: [
      { name: "月4回", price: 33000, items: "個別指導\n相談", featured: false },
    ],
    faqs: [],
  };
  const fetcher = async (url, options) => {
    assert.equal(url, "https://test-gym.microcms.io/api/v1/gym-premium");
    assert.equal(options.cache, "no-store");
    assert.equal(options.redirect, "error");
    assert.equal(options.headers["X-MICROCMS-API-KEY"], "test-secret");
    return Response.json(current);
  };
  let result = normalizeGym(await fetchGymContent(config, fetcher));
  assert.equal(result.site.name, "動作確認ジム");
  assert.equal(result.plans[0].price, "33,000");
  assert.deepEqual(result.faqs, []);
  assert.ok(!JSON.stringify(result).includes("test-secret"));
  current = { ...current, name: "公開更新後" };
  result = normalizeGym(await fetchGymContent(config, fetcher));
  assert.equal(result.site.name, "公開更新後");
});
test("未公開・取得失敗・通信失敗はデモにフォールバックしない", async () => {
  for (const status of [401, 403, 404, 429, 500])
    await assert.rejects(
      fetchGymContent(config, async () => new Response("", { status })),
      new RegExp(String(status)),
    );
  await assert.rejects(
    fetchGymContent(config, async () => Response.json(example)),
    /公開済み/,
  );
  await assert.rejects(
    fetchGymContent(config, async () =>
      Response.json({ contents: [published], publishedAt: "date" }),
    ),
    /オブジェクト/,
  );
  await assert.rejects(
    fetchGymContent(config, async () => {
      throw new Error("test-secret sensitive response");
    }),
    (e) => !e.message.includes("test-secret"),
  );
});
test("予約URL・画像URLの危険な形式を拒否する", () => {
  for (const url of [
    "javascript:alert(1)",
    "data:text/html,test",
    "http://example.com",
    "//example.com",
    "https://user:pass@example.com",
  ])
    assert.throws(() => safeBookingUrl(url));
  assert.equal(
    safeBookingUrl("https://example.com/reserve"),
    "https://example.com/reserve",
  );
  assert.equal(safeBookingUrl(""), "");
  for (const url of [
    "https://evil.test/image.jpg",
    "https://images.microcms-assets.io.evil.test/assets/a.jpg",
    "http://images.microcms-assets.io/assets/a.jpg",
  ])
    assert.throws(() => normalizeGym({ ...published, heroImage: { url } }));
  assert.equal(
    normalizeGym({
      ...published,
      heroImage: { url: "https://images.microcms-assets.io/assets/test/a.jpg" },
    }).images.hero.src,
    "https://images.microcms-assets.io/assets/test/a.jpg",
  );
});
test("不正な金額・プラン数・空欄を拒否し空文字やfalseを保持する", () => {
  for (const price of [-1, 1.5, "33000", NaN])
    assert.throws(() =>
      normalizeGym({ ...published, plans: [{ ...published.plans[0], price }] }),
    );
  assert.throws(() => normalizeGym({ ...published, plans: [] }));
  assert.throws(() =>
    normalizeGym({ ...published, plans: Array(4).fill(published.plans[0]) }),
  );
  assert.throws(() => normalizeGym({ ...published, name: "" }));
  assert.throws(
    () =>
      normalizeGym({
        ...published,
        plans: [
          { ...published.plans[0], items: Array(11).fill("指導").join("\n") },
        ],
      }),
    /1〜10項目/,
  );
  const data = normalizeGym({
    ...published,
    heroBody: "",
    bookingUrl: "",
    plans: [{ ...published.plans[0], price: 0, featured: false }],
  });
  assert.equal(data.copy.heroBody, "");
  assert.equal(data.plans[0].featured, false);
  assert.equal(data.plans[0].price, "0");
});
