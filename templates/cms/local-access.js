// 学習用の認証なしCMSは開発時のみ有効。本番では明示的なローカル試験時以外に無効。
export function localCmsEnabled(env = process.env) {
  return env.NODE_ENV === "development" || env.ENABLE_LOCAL_CMS === "true";
}
