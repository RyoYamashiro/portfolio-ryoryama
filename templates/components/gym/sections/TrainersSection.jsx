"use client";

import { useRef, useState } from "react";

export default function TrainersSection({ trainers }) {
  const [index, setIndex] = useState(0);
  const buttonsRef = useRef([]);
  const activeIndex = Math.min(index, trainers.length - 1);
  const selected = trainers[activeIndex];

  function handleKeyDown(event, current) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? trainers.length - 1
          : (current +
              (event.key === "ArrowRight" ? 1 : -1) +
              trainers.length) %
            trainers.length;
    setIndex(next);
    buttonsRef.current[next]?.focus();
  }

  return (
    <section className="trainer" id="trainer" aria-labelledby="trainer-title">
      <div className="trainer-main-image" id="trainer-portrait">
        <img
          src={selected.image}
          width="718"
          height="560"
          alt={`${selected.name}トレーナー`}
          loading="lazy"
        />
      </div>
      <div className="trainer-details reveal">
        <span className="eyebrow">TRAINER</span>
        <h2 id="trainer-title">
          経験豊富なトレーナーが
          <br />
          あなたの目標をサポート
        </h2>
        <p className="preserve-lines" aria-live="polite">
          {selected.description}
        </p>
        <div
          className="trainer-tiles"
          data-active={activeIndex}
          role="group"
          aria-label="トレーナーを選択"
        >
          {trainers.map((trainer, itemIndex) => (
            <button
              key={itemIndex}
              ref={(element) => {
                buttonsRef.current[itemIndex] = element;
              }}
              className={`trainer-tile${activeIndex === itemIndex ? " active" : ""}`}
              type="button"
              aria-pressed={activeIndex === itemIndex}
              aria-controls="trainer-portrait"
              onClick={() => setIndex(itemIndex)}
              onKeyDown={(event) => handleKeyDown(event, itemIndex)}
            >
              <img
                src={trainer.image}
                alt=""
                width="160"
                height="160"
                loading="lazy"
              />
              <span>
                <strong>{trainer.name}</strong>
                <small>{trainer.englishName}</small>
                <em className="preserve-lines">{trainer.qualification}</em>
              </span>
              {activeIndex === itemIndex && (
                <span className="tiny-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
