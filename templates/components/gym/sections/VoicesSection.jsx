"use client";

import { useEffect, useRef, useState } from "react";
import { voices } from "../../../content/gym/voices";
import Icon from "../ui/Icon";

export default function VoicesSection() {
  const trackRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(2);
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, voices.length - visibleCount);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    function update() {
      setVisibleCount(media.matches ? 1 : 2);
      setIndex(0);
      trackRef.current?.scrollTo({ left: 0, behavior: "instant" });
    }
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  function stepWidth() {
    const track = trackRef.current;
    return (
      track.firstElementChild.getBoundingClientRect().width +
      (parseFloat(getComputedStyle(track).columnGap) || 0)
    );
  }

  function goTo(next) {
    const target = (next + maxIndex + 1) % (maxIndex + 1);
    trackRef.current.scrollTo({
      left: stepWidth() * target,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    setIndex(target);
  }

  return (
    <section
      className="voices section"
      id="voices"
      aria-labelledby="voices-title"
    >
      <div className="page-shell voice-layout">
        <div className="section-intro reveal">
          <span className="eyebrow">VOICE</span>
          <h2 id="voices-title">お客様の声</h2>
          <p>
            多くのお客様に
            <br />
            選ばれています。
          </p>
        </div>
        <div className="voices-carousel reveal">
          <button
            className="floating-arrow floating-left"
            type="button"
            aria-label="前の口コミ"
            onClick={() => goTo(index - 1)}
          >
            <Icon name="left" />
          </button>
          <div
            className="voice-track"
            ref={trackRef}
            role="region"
            aria-label="お客様の声を横にスライド"
            tabIndex={0}
            onScroll={() =>
              setIndex(
                Math.max(
                  0,
                  Math.min(
                    maxIndex,
                    Math.round(trackRef.current.scrollLeft / stepWidth()),
                  ),
                ),
              )
            }
          >
            {voices.map((voice) => (
              <article className="voice-card" key={voice.title}>
                <img
                  src={voice.image}
                  alt={voice.alt}
                  width="760"
                  height="504"
                  loading="lazy"
                />
                <div>
                  <h3 className="preserve-lines">{voice.title}</h3>
                  <p>{voice.description}</p>
                  <small>{voice.profile}</small>
                </div>
              </article>
            ))}
          </div>
          <button
            className="floating-arrow floating-right"
            type="button"
            aria-label="次の口コミ"
            onClick={() => goTo(index + 1)}
          >
            <Icon name="right" />
          </button>
          <div
            className="slider-dots"
            role="group"
            aria-label="口コミのスライド位置"
          >
            {Array.from({ length: maxIndex + 1 }, (_, dot) => (
              <button
                key={dot}
                className={index === dot ? "active" : ""}
                type="button"
                aria-label={`${dot + 1}ページ目の口コミを表示`}
                aria-current={index === dot ? "true" : undefined}
                onClick={() => goTo(dot)}
              />
            ))}
          </div>
          <span className="sr-only" aria-live="polite">
            口コミの{index + 1}ページ目を表示
          </span>
        </div>
      </div>
    </section>
  );
}
