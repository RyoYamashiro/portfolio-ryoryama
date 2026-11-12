import { site } from "../../content/gym/site.js";
import { copy } from "../../content/gym/copy.js";
import { courses } from "../../content/gym/courses.js";
import { trainers } from "../../content/gym/trainers.js";
import { faqs } from "../../content/gym/faqs.js";
import { text, required, image, safeBookingUrl } from "./fields.js";

function list(value, name, min, max) {
  const entries = value ?? [];
  if (
    !Array.isArray(entries) ||
    entries.length < min ||
    entries.length > max ||
    entries.some(
      (entry) => !entry || typeof entry !== "object" || Array.isArray(entry),
    )
  )
    throw new Error(`${name}は${min}〜${max}件で設定してください。`);
  return entries;
}

export function normalizeStella(data) {
  if (data === null)
    return {
      demo: true,
      site: { ...site, bookingUrl: "" },
      copy,
      courses,
      trainers,
      faqs,
      hero: image(
        null,
        "/images/gym/hero-right.webp",
        "明るいジムでトレーニングする女性",
      ),
    };
  return {
    demo: false,
    site: {
      name: required(data.name, 80),
      subtitle: text(data.subtitle, "", 80),
      phone: text(data.phone, "", 80),
      hours: text(data.hours, "", 200),
      title: required(data.title, 200),
      description: required(data.description, 500),
      bookingUrl: safeBookingUrl(data.bookingUrl),
    },
    copy: {
      heroTitle: required(data.heroTitle, 200),
      heroBody: text(data.heroBody, "", 4000),
      contactTitle: required(data.contactTitle, 200),
    },
    hero: image(
      data.heroImage,
      "/images/gym/hero-right.webp",
      text(data.heroAlt, "トレーニング風景", 300),
    ),
    courses: list(data.courses, "料金プラン", 1, 3).map((course, index) => {
      if (
        !Number.isSafeInteger(course.price) ||
        course.price < 0 ||
        course.price > 10000000
      )
        throw new Error("料金は0〜10000000の整数で設定してください。");
      const tags = text(course.tags, "", 500)
        .split(/\r?\n/)
        .map((tag) => tag.trim())
        .filter(Boolean);
      if (tags.length > 5)
        throw new Error("プランのタグは5項目以内で設定してください。");
      return {
        title: required(course.title, 80),
        description: text(course.description, "", 2000),
        price: course.price.toLocaleString("ja-JP"),
        tags,
        image: image(course.image, courses[index].image, "").src,
        alt: text(course.alt, "トレーニングプランのイメージ", 300),
      };
    }),
    trainers: list(data.trainers, "トレーナー", 1, 3).map((trainer, index) => ({
      name: required(trainer.name, 80),
      englishName: text(trainer.englishName, "", 100),
      qualification: text(trainer.qualification, "", 500),
      description: text(trainer.description, "", 4000),
      image: image(trainer.image, trainers[index].image, "").src,
    })),
    faqs: list(data.faqs, "よくある質問", 0, 30).map((faq) => ({
      question: required(faq.question, 300),
      answer: required(faq.answer, 4000),
    })),
  };
}
