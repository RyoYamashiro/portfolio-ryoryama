import "server-only";
import { cache } from "react";
import { fetchGymContent } from "./client.js";
import { normalizeGym } from "./normalize.js";

// 同じリクエストのメタデータと本文で取得結果を共有。キーはクライアントに渡しません。
export const getPremiumGym = cache(async () =>
  normalizeGym(
    await fetchGymContent({
      domain: process.env.MICROCMS_SERVICE_DOMAIN,
      apiKey: process.env.MICROCMS_API_KEY,
      endpoint: process.env.MICROCMS_GYM_ENDPOINT || "gym-premium",
    }),
  ),
);
