"use client";

import { useRef, useState } from "react";
import Icon from "../ui/Icon";

export default function CoursesSection({ courses }) {
  const trackRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const orderedCourses = [
    ...courses.slice(offset),
    ...courses.slice(0, offset),
  ];

  function move(direction) {
    // PCは3枚の並びを切り替え、スマホは横スクロールします。
    if (window.matchMedia("(min-width: 701px)").matches) {
      setOffset(
        (current) => (current + direction + courses.length) % courses.length,
      );
      return;
    }
    const track = trackRef.current;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = track.firstElementChild.getBoundingClientRect().width + gap;
    const max = track.scrollWidth - track.clientWidth;
    let left = track.scrollLeft + direction * step;
    if (left > max + 5) left = 0;
    if (left < -5) left = max;
    track.scrollTo({
      left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <section
      className="courses section"
      id="courses"
      aria-labelledby="course-title"
    >
      <div className="page-shell split-layout">
        <div className="section-intro reveal">
          <span className="eyebrow">COURSE</span>
          <h2 id="course-title">
            目的に合わせて選べる
            <br />
            トレーニングプラン
          </h2>
          <p>
            あなたのライフスタイルや目標に合わせて、最適なプランをご用意します。
          </p>
          <a className="btn btn-outline" href="#course-list">
            コースの詳細を見る <Icon name="arrow" />
          </a>
        </div>
        <div
          className="course-slider reveal"
          id="course-list"
          aria-label="トレーニングプラン"
        >
          <button
            className="floating-arrow floating-left"
            type="button"
            aria-label="前のコース"
            onClick={() => move(-1)}
          >
            <Icon name="left" />
          </button>
          <div
            className="course-track"
            ref={trackRef}
            tabIndex={0}
            role="region"
            aria-label="コースを横にスクロール"
          >
            {orderedCourses.map((course, index) => (
              <article className="course-card" key={index}>
                <img
                  src={course.image}
                  alt={course.alt}
                  width="760"
                  height="504"
                  loading="lazy"
                />
                <div className="course-card-body">
                  <h3>{course.title}</h3>
                  <div className="course-tags">
                    {course.tags.map((tag, tagIndex) => (
                      <span key={tagIndex}>{tag}</span>
                    ))}
                  </div>
                  <p>{course.description}</p>
                  <div className="price-row">
                    <span>
                      月額{" "}
                      <b>
                        {course.price}
                        <small>円〜</small>
                      </b>
                    </span>
                    <a
                      href="#contact"
                      className="round-arrow"
                      aria-label={`${course.title}を相談する`}
                    >
                      <Icon name="arrow" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <button
            className="floating-arrow floating-right"
            type="button"
            aria-label="次のコース"
            onClick={() => move(1)}
          >
            <Icon name="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
