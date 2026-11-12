"use client";

import { useState } from "react";
import Icon from "../ui/Icon";

export default function FaqSection({ faqs }) {
  const [showAll, setShowAll] = useState(false);
  return (
    <section
      className="faq-section section"
      id="faq"
      aria-labelledby="faq-title"
    >
      <div className="page-shell faq-layout">
        <div className="section-intro reveal">
          <span className="eyebrow">FAQ</span>
          <h2 id="faq-title">よくあるご質問</h2>
          <p>初めての方からよくいただくご質問をまとめました。</p>
        </div>
        <div className="faq-list reveal" id="faq-list">
          {faqs.length === 0 && <p>ご不明な点はお問い合わせください。</p>}
          {faqs.map((faq, index) => (
            <details key={index} hidden={index >= 3 && !showAll}>
              <summary>
                {faq.question} <Icon name="plus" />
              </summary>
              <p className="preserve-lines">{faq.answer}</p>
            </details>
          ))}
          {faqs.length > 3 && (
            <button
              className="more-link"
              type="button"
              aria-expanded={showAll}
              aria-controls="faq-list"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "質問を閉じる" : "すべての質問を見る"}{" "}
              <Icon name="arrow" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
