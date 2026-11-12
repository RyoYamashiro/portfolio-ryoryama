import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtempSync,
  readFileSync,
  writeFileSync,
  rmSync,
  renameSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { once } from "node:events";
import { createServer } from "node:net";
import { spawn } from "node:child_process";
import { setTimeout } from "node:timers/promises";

test("CMS公開データが本番サーバーのHTML・SEO・予約リンクへ反映される", async (t) => {
  const dir = mkdtempSync(join(tmpdir(), "gym-cms-"));
  const file = join(dir, "fixture.json");
  const example = JSON.parse(
    readFileSync("docs/microcms/gym-premium-content-example.json", "utf8"),
  );
  let content = {
    ...example,
    publishedAt: "2026-10-29T00:00:00Z",
    name: "結合テストジム",
    title: "検索タイトル確認",
    heroTitle: "公開中の見出し",
    bookingUrl: "https://example.com/booking",
    plans: [
      { name: "単一プラン", price: 33000, items: "個別指導", featured: false },
    ],
    faqs: [{ question: "公開の質問", answer: "公開の回答" }],
  };
  let stella = {
    ...JSON.parse(
      readFileSync("docs/microcms/gym-content-example.json", "utf8"),
    ),
    publishedAt: "2026-10-30T00:00:00Z",
    name: "白ジム確認",
    title: "白ジムSEO",
    heroTitle: "STELLA公開見出し",
    bookingUrl: "https://example.com/stella-booking",
    heroImage: {
      url: "https://images.microcms-assets.io/assets/test/stella.webp",
    },
    faqs: [{ question: "白ジム質問", answer: "白ジム回答" }],
  };
  let stellaStatus = 200;
  function save(status = 200) {
    writeFileSync(
      file + ".tmp",
      JSON.stringify({
        body: content,
        status,
        stella: { body: stella, status: stellaStatus },
      }),
    );
    renameSync(file + ".tmp", file);
  }
  save();
  const probe = createServer();
  probe.listen(0, "127.0.0.1");
  await once(probe, "listening");
  const port = probe.address().port;
  await new Promise((r) => probe.close(r));
  const app = spawn(
    process.execPath,
    [
      "--import",
      resolve("scripts/test-support/microcms-fetch.mjs"),
      "node_modules/next/dist/bin/next",
      "start",
      "--hostname",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    {
      env: {
        ...process.env,
        PORT: String(port),
        ENABLE_LOCAL_CMS: "",
        MICROCMS_SERVICE_DOMAIN: "integration-gym",
        MICROCMS_API_KEY: "integration-secret-must-not-leak",
        MICROCMS_GYM_ENDPOINT: "gym-premium",
        MICROCMS_STELLA_ENDPOINT: "gym",
        CMS_TEST_FIXTURE: file,
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  let output = "";
  app.stdout.on("data", (d) => {
    output += d;
  });
  app.stderr.on("data", (d) => {
    output += d;
  });
  t.after(async () => {
    if (app.exitCode === null) {
      const end = once(app, "exit");
      app.kill();
      await end;
    }
    rmSync(dir, { recursive: true, force: true });
  });
  const base = `http://127.0.0.1:${port}`;
  let ready = false;
  for (let i = 0; i < 100; i++) {
    if (app.exitCode !== null) throw Error(output);
    try {
      if ((await fetch(base)).ok) {
        ready = true;
        break;
      }
    } catch {}
    await setTimeout(100);
  }
  assert.ok(ready, "server starts");
  const get = async () => {
    const res = await fetch(base + "/gym-premium");
    return { res, html: await res.text() };
  };
  const first = await get();
  assert.equal(first.res.status, 200);
  assert.match(first.html, /<title>検索タイトル確認<\/title>/);
  assert.match(first.html, /公開中の見出し/);
  assert.match(first.html, /33,000/);
  assert.match(first.html, /href="https:\/\/example.com\/booking"/);
  assert.match(first.html, /公開の回答/);
  assert.ok(!first.html.includes("integration-secret-must-not-leak"));
  assert.equal((first.html.match(/<h1\b/g) || []).length, 1);
  // 下書き相当の未取得データはHTMLへ出さない。リクエストにdraftKeyも送らない。
  const draft = "未公開の変更は表示しない";
  assert.ok(!(await get()).html.includes(draft));
  content = { ...content, heroTitle: "更新を公開しました", faqs: [] };
  save();
  const updated = await get();
  assert.match(updated.html, /更新を公開しました/);
  assert.ok(!updated.html.includes("公開の回答"));
  content = { ...content, heroTitle: '<script>alert("xss")</script>' };
  save();
  assert.ok(!(await get()).html.includes('<script>alert("xss")</script>'));
  // 標準管理画面はmicroCMS側。旧教材の認証なしAPIは本番で閉じる。
  assert.equal((await fetch(base + "/api/admin/posts")).status, 404);
  assert.equal((await fetch(base + "/admin")).status, 404);
  const getStella = async () => {
    const response = await fetch(base + "/gym");
    return { response, html: await response.text() };
  };
  const white = await getStella();
  assert.equal(white.response.status, 200);
  for (const value of [
    "白ジム確認",
    "<title>白ジムSEO</title>",
    "STELLA公開見出し",
    "96,000",
    "白ジム回答",
    "stella.webp",
    "https://example.com/stella-booking",
  ])
    assert.ok(white.html.includes(value), value);
  assert.ok(!white.html.includes("結合テストジム"));
  assert.ok(!white.html.includes("integration-secret-must-not-leak"));
  assert.equal((white.html.match(/<h1\b/g) || []).length, 1);
  stella = {
    ...stella,
    heroTitle: '<script>alert("stella")</script>',
    courses: [{ ...stella.courses[0], price: 12345 }],
    trainers: [stella.trainers[0]],
    faqs: [],
  };
  save();
  const whiteUpdated = await getStella();
  assert.ok(whiteUpdated.html.includes("12,345"));
  assert.ok(!whiteUpdated.html.includes("白ジム回答"));
  assert.ok(!whiteUpdated.html.includes('<script>alert("stella")</script>'));
  assert.ok(
    (await get()).html.includes("33,000"),
    "STELLAの更新でNAGIは変わらない",
  );
  stellaStatus = 404;
  save();
  const whiteFailed = await getStella();
  assert.ok(!whiteFailed.html.includes("96,000"));
  assert.ok(!whiteFailed.html.includes("integration-secret-must-not-leak"));
  save(403);
  const failed = await get();
  assert.ok(
    !failed.html.includes("22,000"),
    "取得エラー時にデモ料金を表示しない",
  );
  assert.ok(!failed.html.includes("integration-secret-must-not-leak"));
});
