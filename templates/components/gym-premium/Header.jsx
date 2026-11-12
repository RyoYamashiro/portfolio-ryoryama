"use client";
import { useState } from "react";
import BookingButton from "./BookingButton";
import { navigation } from "../../content/gym-premium/site";
export default function Header({ site }) {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="premium-header"
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <a
        className="premium-brand"
        href="#top"
        aria-label={`${site.name} トップ`}
      >
        {site.name}
        <span>{site.label}</span>
      </a>
      <nav className="premium-desktop-nav" aria-label="メインナビゲーション">
        {navigation.map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>
      <div className="premium-header-actions">
        <BookingButton
          bookingUrl={site.bookingUrl}
          className="premium-button premium-header-booking"
        >
          体験を予約する
        </BookingButton>
        <button
          className={`premium-menu-toggle ${open ? "is-open" : ""}`}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="premium-mobile-nav"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav
        id="premium-mobile-nav"
        className="premium-dropdown"
        hidden={!open}
        aria-label="サイトメニュー"
      >
        {navigation.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
            <span aria-hidden="true">→</span>
          </a>
        ))}
        <a href="/">STELLAのテンプレートを見る ↗</a>
      </nav>
    </header>
  );
}
