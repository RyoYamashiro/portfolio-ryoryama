"use client";
import { useId, useRef } from "react";
export default function DetailsDialog({ label, title, children }) {
  const ref = useRef(null);
  const id = useId();
  return (
    <>
      <button
        className="premium-button premium-button-small"
        onClick={() => ref.current?.showModal()}
      >
        {label}
        <span aria-hidden="true">→</span>
      </button>
      <dialog
        ref={ref}
        className="premium-dialog"
        aria-labelledby={id}
        onClick={(e) => {
          if (e.target === e.currentTarget) ref.current.close();
        }}
      >
        <h2 id={id}>{title}</h2>
        {children}
        <form method="dialog">
          <button className="premium-button" autoFocus>
            閉じる<span aria-hidden="true">×</span>
          </button>
        </form>
      </dialog>
    </>
  );
}
