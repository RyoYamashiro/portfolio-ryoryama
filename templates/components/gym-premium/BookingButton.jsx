"use client";
import { useId, useRef } from "react";

export default function BookingButton({
  bookingUrl = "",
  children = "体験トレーニングを予約",
  className = "premium-button",
}) {
  const dialog = useRef(null);
  const titleId = useId();
  if (bookingUrl)
    return (
      <a className={className} href={bookingUrl}>
        {children}
        <span aria-hidden="true">→</span>
      </a>
    );
  return (
    <>
      <button className={className} onClick={() => dialog.current?.showModal()}>
        {children}
        <span aria-hidden="true">→</span>
      </button>
      <dialog
        className="premium-dialog"
        ref={dialog}
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current.close();
        }}
      >
        <p className="premium-eyebrow">TRIAL SESSION</p>
        <h2 id={titleId}>はじめの一歩を、ここから。</h2>
        <p>こちらはテンプレートのデモです。実際の予約は受け付けていません。</p>
        <p>公開時には、店舗の予約ページへつながります。</p>
        <form method="dialog">
          <button className="premium-button" autoFocus>
            閉じる<span aria-hidden="true">×</span>
          </button>
        </form>
      </dialog>
    </>
  );
}
