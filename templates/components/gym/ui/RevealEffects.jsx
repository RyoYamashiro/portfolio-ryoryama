"use client";

import { useEffect } from "react";

// 演出だけを担当します。JS無効時や低モーション設定でも本文を表示します。
export default function RevealEffects() {
  useEffect(() => {
    if (
      !window.IntersectionObserver ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const elements = document.querySelectorAll(".gym-site .reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    elements.forEach((element) => {
      // 初期画面内の内容は隠さず、画面外だけを演出の対象にします。
      if (element.getBoundingClientRect().top >= window.innerHeight) {
        element.classList.add("reveal-pending");
        observer.observe(element);
      }
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove("reveal-pending"));
    };
  }, []);
  return null;
}
