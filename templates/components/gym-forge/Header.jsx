"use client";
import { useState, useRef } from "react";
import { navigation, site } from "../../content/gym-forge/site";
import BookingButton from "./BookingButton";
export default function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef(null);
  return (
    <header
      className="forge-header"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          button.current?.focus();
        }
      }}
    >
      <a className="forge-brand" href="#forge-top" aria-label="FORGE トップへ">
        <strong>{site.name}</strong>
        <small>{site.subtitle}</small>
      </a>
      <nav className="forge-desktop-nav" aria-label="メインナビゲーション">
        {navigation.map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>
      <BookingButton className="forge-header-booking" />
      <button
        ref={button}
        className="forge-menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="forge-mobile-nav"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
      <nav
        id="forge-mobile-nav"
        className="forge-mobile-nav"
        hidden={!open}
        aria-label="モバイルナビゲーション"
        onClick={() => setOpen(false)}
      >
        {navigation.map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>
    </header>
  );
}
