// 本番には読み込まれない結合テスト専用のHTTPモック。
// Next.jsを起動するテストプロセスに --import で明示的に注入する。
import { readFileSync } from "node:fs";
if (process.env.CMS_TEST_FIXTURE) {
  const original = globalThis.fetch;
  globalThis.fetch = async function (input, options) {
    const url =
      typeof input === "string" ? input : (input.url ?? String(input));
    if (url.startsWith("https://integration-gym.microcms.io/")) {
      if (
        ![
          "https://integration-gym.microcms.io/api/v1/gym-premium",
          "https://integration-gym.microcms.io/api/v1/gym",
        ].includes(url)
      )
        throw new Error("Unexpected CMS URL");
      if (
        options.headers["X-MICROCMS-API-KEY"] !==
        "integration-secret-must-not-leak"
      )
        return new Response("", { status: 403 });
      const fixture = JSON.parse(
        readFileSync(process.env.CMS_TEST_FIXTURE, "utf8"),
      );
      const response = url.endsWith("/gym") ? fixture.stella : fixture;
      return Response.json(response.body, { status: response.status ?? 200 });
    }
    return original(input, options);
  };
}
