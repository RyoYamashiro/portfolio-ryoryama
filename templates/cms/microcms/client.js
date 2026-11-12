// Pure request function for testing. Only the server-only loader supplies credentials.
export async function fetchGymContent(
  { domain, apiKey, endpoint = "gym-premium" },
  fetcher = fetch,
) {
  if (!domain && !apiKey) return null;
  if (
    !domain ||
    !apiKey ||
    !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(domain) ||
    !/^[a-z0-9_-]{3,32}$/.test(endpoint)
  ) {
    throw new Error("microCMSの接続設定を確認してください。");
  }
  let response;
  try {
    response = await fetcher(
      `https://${domain}.microcms.io/api/v1/${endpoint}`,
      {
        headers: { "X-MICROCMS-API-KEY": apiKey },
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(8000),
      },
    );
  } catch {
    throw new Error("microCMSに接続できません。通信状態を確認してください。");
  }
  if (!response.ok)
    throw new Error(
      `microCMSの取得に失敗しました（HTTP ${response.status}）。公開状態・API形式・GET権限を確認してください。`,
    );
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("microCMSの応答形式を確認してください。");
  }
  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data) ||
    "contents" in data ||
    !data.publishedAt
  ) {
    throw new Error(
      "microCMSには公開済みのオブジェクト形式コンテンツを設定してください。",
    );
  }
  return data;
}
