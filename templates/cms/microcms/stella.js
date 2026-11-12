import "server-only";
import { cache } from "react";
import { fetchGymContent } from "./client.js";
import { normalizeStella } from "./normalize-stella.js";

// 明示的に有効化するまでSTELLAはデモ表示。NAGIの接続には影響しません。
export const getStellaGym = cache(async () => {
  if (!process.env.MICROCMS_STELLA_ENDPOINT) return normalizeStella(null);
  const data = await fetchGymContent({
    domain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
    endpoint: process.env.MICROCMS_STELLA_ENDPOINT,
  });
  if (!data) throw new Error("STELLAのサービスIDとAPIキーを設定してください。");
  return normalizeStella(data);
});
