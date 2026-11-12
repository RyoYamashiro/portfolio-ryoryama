export function text(value, fallback, max = 4000) {
  if (value === undefined || value === null) return fallback;
  if (typeof value !== "string" || value.length > max)
    throw new Error("CMSの文章フィールドの形式・文字数を確認してください。");
  return value.trim();
}
export function required(value, max = 200) {
  const result = text(value, "", max);
  if (!result) throw new Error("CMSの必須項目が未入力です。");
  return result;
}
export function safeBookingUrl(value) {
  const raw = text(value, "", 2048);
  if (!raw) return "";
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("予約URLはhttpsのURLを入力してください。");
  }
  if (url.protocol !== "https:" || url.username || url.password)
    throw new Error(
      "予約URLは認証情報を含まないhttpsのURLを入力してください。",
    );
  return url.href;
}
export function image(value, fallback, alt) {
  if (!value) return { src: fallback, alt };
  let url;
  try {
    url = new URL(value.url);
  } catch {
    throw new Error("CMS画像のURLを確認してください。");
  }
  if (
    url.protocol !== "https:" ||
    url.hostname !== "images.microcms-assets.io" ||
    url.port ||
    url.username ||
    url.password ||
    !url.pathname.startsWith("/assets/")
  )
    throw new Error("画像はmicroCMSの画像フィールドで設定してください。");
  return { src: url.href, alt };
}
