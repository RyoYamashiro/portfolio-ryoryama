"use client";
import { useId, useRef } from "react";
import { site } from "../../content/gym-forge/site";
export default function BookingButton({
  children = "体験を予約する",
  className = "",
}) {
  const ref = useRef(null);
  const id = useId();
  const label = (
    <>
      {children}
      <span aria-hidden="true">→</span>
    </>
  );
  if (site.bookingUrl)
    return (
      <a className={`forge-button ${className}`} href={site.bookingUrl}>
        {label}
      </a>
    );
  return (
    <>
      <button
        type="button"
        className={`forge-button ${className}`}
        onClick={() => ref.current?.showModal()}
      >
        {label}
      </button>
      <dialog
        ref={ref}
        className="forge-dialog"
        aria-labelledby={id}
        onClick={(e) => {
          if (e.target === e.currentTarget) ref.current.close();
        }}
      >
        <p className="forge-eyebrow">TRIAL SESSION</p>
        <h2 id={id}>はじめの一歩を、ここから。</h2>
        <p>
          FORGEはデザイン確認用の架空のジムです。実際の予約は受け付けていません。
        </p>
        <p>店舗への導入時には、ご利用の予約ページやLINEへ接続できます。</p>
        <form method="dialog">
          <button className="forge-button" autoFocus>
            閉じる <span aria-hidden="true">×</span>
          </button>
        </form>
      </dialog>
    </>
  );
}
