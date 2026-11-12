"use client";

import { useEffect, useRef } from "react";
import Icon from "./Icon";

// 呼び出し元は open と onClose だけを管理します。Escとフォーカス復帰はdialog標準動作を使います。
export default function DemoDialog({
  open,
  onClose,
  title,
  titleId,
  eyebrow,
  children,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="booking-dialog"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="dialog-content">
        <button
          className="dialog-close"
          type="button"
          aria-label="閉じる"
          onClick={() => dialogRef.current.close()}
        >
          <Icon name="x" />
        </button>
        <span className="eyebrow">{eyebrow}</span>
        <h2 id={titleId}>{title}</h2>
        {children}
      </div>
    </dialog>
  );
}
