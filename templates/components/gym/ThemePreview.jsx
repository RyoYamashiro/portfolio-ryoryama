"use client";

import { useState } from "react";
import { themes } from "../../content/gym/themes";

// childrenはサーバー側で組み立てたページ。ここでは色のCSS変数だけを切り替えます。
export default function ThemePreview({ children }) {
  const [theme, setTheme] = useState(themes[0]);
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className="gym-site"
      style={{
        "--teal": theme.accent,
        "--teal-deep": theme.accent,
        "--theme-swatch": theme.swatch,
        "--button-start": theme.start,
        "--button-end": theme.end,
        "--button-text": theme.foreground,
      }}
    >
      {children}
      <aside className="theme-palette" aria-label="テーマカラーのプレビュー">
        <button
          className="theme-palette-toggle"
          type="button"
          aria-expanded={expanded}
          aria-controls="theme-palette-options"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="theme-palette-mark" aria-hidden="true" />
          <span>テーマカラー</span>
          <span className="theme-palette-chevron" aria-hidden="true">
            {expanded ? "−" : "+"}
          </span>
        </button>
        <div id="theme-palette-options" hidden={!expanded}>
          <div
            className="theme-palette-colors"
            role="group"
            aria-label="カラーを選択"
          >
            {themes.map((option) => (
              <button
                key={option.id}
                className="theme-palette-swatch"
                style={{ "--swatch": option.swatch }}
                type="button"
                aria-label={option.label}
                title={option.label}
                aria-pressed={theme.id === option.id}
                onClick={() => setTheme(option)}
              >
                <span aria-hidden="true">
                  {theme.id === option.id ? "✓" : ""}
                </span>
              </button>
            ))}
          </div>
          <div className="theme-palette-footer">
            <span aria-live="polite">{theme.label}</span>
            <button type="button" onClick={() => setTheme(themes[0])}>
              元に戻す
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
