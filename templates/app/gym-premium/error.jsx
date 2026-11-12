"use client";
export default function GymError({ reset }) {
  return (
    <main
      style={{ maxWidth: 640, margin: "80px auto", padding: 24, lineHeight: 2 }}
    >
      <h1>店舗情報を読み込めませんでした</h1>
      <p>
        時間をおいて再度お試しください。管理者の方は、ターミナルとmicroCMSの公開状態・接続設定をご確認ください。
      </p>
      <button onClick={reset}>もう一度読み込む</button>
      <p>
        <a href="/">トップページへ</a>
      </p>
    </main>
  );
}
