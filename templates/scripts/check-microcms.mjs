import nextEnv from "@next/env";
import { fetchGymContent } from "../cms/microcms/client.js";
import { normalizeGym } from "../cms/microcms/normalize.js";
import { normalizeStella } from "../cms/microcms/normalize-stella.js";
nextEnv.loadEnvConfig(process.cwd());
try {
  const stella = process.argv.includes("--stella");
  if (stella && !process.env.MICROCMS_STELLA_ENDPOINT)
    throw new Error(
      ".env.local に MICROCMS_STELLA_ENDPOINT=gym を設定してください。",
    );
  const raw = await fetchGymContent({
    domain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
    endpoint: stella
      ? process.env.MICROCMS_STELLA_ENDPOINT
      : process.env.MICROCMS_GYM_ENDPOINT || "gym-premium",
  });
  if (raw === null)
    throw new Error(
      ".env.local にサービスIDとAPIキーを設定してください（現在は未接続です）。",
    );
  const data = stella ? normalizeStella(raw) : normalizeGym(raw);
  console.log(
    `接続OK：公開データ・入力形式を確認しました。料金 ${(stella ? data.courses : data.plans).length}件 / FAQ ${data.faqs.length}件。`,
  );
  console.log(
    `次は ${stella ? "/gym" : "/gym-premium"} で表示と更新を確認してください。APIキーは表示していません。`,
  );
} catch (error) {
  console.error(`接続確認NG：${error.message}`);
  process.exitCode = 1;
}
