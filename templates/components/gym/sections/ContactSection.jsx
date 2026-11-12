"use client";

import { useState } from "react";
import Icon from "../ui/Icon";
import DemoDialog from "../ui/DemoDialog";

export default function ContactSection({ site, copy }) {
  const [open, setOpen] = useState(false);
  return (
    <section
      className="contact-banner"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-art-left" />
      <div className="contact-art-right" />
      <div className="contact-inner reveal">
        <h2 id="contact-title" className="preserve-lines">
          {copy.contactTitle}
        </h2>
        {site.bookingUrl ? (
          <a className="btn btn-primary contact-btn" href={site.bookingUrl}>
            無料カウンセリングを予約する <Icon name="arrow" />
          </a>
        ) : (
          <button
            className="btn btn-primary contact-btn"
            type="button"
            onClick={() => setOpen(true)}
          >
            無料カウンセリングを予約する <Icon name="arrow" />
          </button>
        )}
        <p>＼ たった30秒で簡単予約 ／</p>
      </div>
      <DemoDialog
        open={open}
        onClose={() => setOpen(false)}
        title="無料カウンセリング"
        titleId="booking-title"
        eyebrow="FREE COUNSELING"
      >
        <p>
          こちらはデザイン確認用のデモサイトです。実際に公開するときは、予約ボタンにジムの予約ページやLINEのURLを設定してください。
        </p>
        <a
          className="btn btn-outline"
          href="#top"
          onClick={() => setOpen(false)}
        >
          トップへ戻る <Icon name="arrow" />
        </a>
      </DemoDialog>
    </section>
  );
}
