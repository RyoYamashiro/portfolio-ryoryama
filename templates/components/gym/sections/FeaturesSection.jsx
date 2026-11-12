"use client";

import { useState } from "react";
import { features } from "../../../content/gym/features";
import Icon from "../ui/Icon";

export default function FeaturesSection({ site }) {
  const [index, setIndex] = useState(0);
  const selected = features[index];
  const number = String(index + 1).padStart(2, "0");

  function select(next) {
    setIndex((next + features.length) % features.length);
  }

  return (
    <section
      className="features section"
      id="features"
      aria-labelledby="feature-title"
    >
      <div className="page-shell feature-layout">
        <div className="section-intro reveal">
          <span className="eyebrow">FEATURES</span>
          <h2 id="feature-title">
            {site.name}が<br />
            選ばれる{features.length}つの理由
          </h2>
          <div className="slider-controls feature-nav">
            <span className="slide-index">
              <strong>{number}</strong>
              <span> / {String(features.length).padStart(2, "0")}</span>
            </span>
            <button
              className="circle-btn"
              type="button"
              aria-label="前の理由"
              onClick={() => select(index - 1)}
            >
              <Icon name="left" />
            </button>
            <button
              className="circle-btn is-accent"
              type="button"
              aria-label="次の理由"
              onClick={() => select(index + 1)}
            >
              <Icon name="right" />
            </button>
          </div>
        </div>
        <div className="feature-content reveal">
          <article
            className="feature-highlight is-changing"
            key={index}
            id="feature-panel"
            aria-live="polite"
          >
            <div className="feature-highlight-text">
              <div className="feature-meta">
                <span>{number}</span>
                <span className="small-pill">{selected.tag}</span>
              </div>
              <h3 className="preserve-lines">{selected.title}</h3>
              <p>{selected.description}</p>
              <a href="#courses" className="text-link">
                詳しく見る <Icon name="arrow" />
              </a>
            </div>
            <img
              src={selected.img}
              width="474"
              height="332"
              alt={selected.alt}
              loading="lazy"
            />
          </article>
          <div
            className="feature-thumbs"
            role="group"
            aria-label="ジムが選ばれる理由"
          >
            {features.map((feature, itemIndex) => (
              <button
                key={feature.img}
                className={`feature-thumb${index === itemIndex ? " active" : ""}`}
                type="button"
                aria-pressed={index === itemIndex}
                aria-controls="feature-panel"
                onClick={() => select(itemIndex)}
              >
                <img
                  src={feature.img}
                  alt=""
                  width="160"
                  height="81"
                  loading="lazy"
                />
                <span>{feature.label ?? feature.tag}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
