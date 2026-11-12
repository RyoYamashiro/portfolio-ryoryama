"use client";

import { useRef, useState } from "react";
import Brand from "./ui/Brand";
import Icon from "./ui/Icon";

export default function SiteHeader({ site }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  return (
    <header
      className="site-header"
      id="top"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
    >
      <div className="header-inner page-shell">
        <Brand site={site} />
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          <a href="#features">はじめての方へ</a>
          <a href="#courses">コース・料金</a>
          <a href="#trainer">トレーナー</a>
          <a href="#voices">お客様の声</a>
          <a href="#blog">ブログ</a>
        </nav>
        <div className="header-actions">
          <a
            className="phone"
            href="#contact"
            aria-label="電話番号とお問い合わせについて"
          >
            <Icon name="phone" />
            <span>
              <b>{site.phone}</b>
              <small>{site.hours}</small>
            </span>
          </a>
          <a className="btn btn-primary btn-header" href="#contact">
            無料カウンセリング予約{" "}
            <Icon name="arrow" className="icon icon-arrow" />
          </a>
        </div>
        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          aria-controls="mobile-menu"
        >
          <Icon name={open ? "x" : "menu"} />
        </button>
      </div>
      <nav
        className={`mobile-nav${open ? " open" : ""}`}
        id="mobile-menu"
        aria-label="モバイルメニュー"
        inert={!open}
        onClick={() => setOpen(false)}
      >
        <a href="#features">はじめての方へ</a>
        <a href="#courses">コース・料金</a>
        <a href="#trainer">トレーナー</a>
        <a href="#flow">ご利用の流れ</a>
        <a href="#voices">お客様の声</a>
        <a href="#faq">よくあるご質問</a>
        <a href="#blog">ブログ</a>
        <a className="mobile-nav-cta" href="#contact">
          無料カウンセリング予約
        </a>
      </nav>
    </header>
  );
}
