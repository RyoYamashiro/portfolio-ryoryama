import { site, plans, faqs, copy } from "../../content/gym-premium/site.js";
const imageNames = ["hero", "reception", "equipment", "trainer", "studio"];
import { text, required, image, safeBookingUrl } from "./fields.js";
export { safeBookingUrl } from "./fields.js";
export function normalizeGym(data) {
  const demo = data === null;
  if (demo) data = {};
  const result = {
    demo,
    site: {
      ...site,
      name: demo ? site.name : required(data.name, 80),
      label: text(data.label, site.label, 80),
      title: demo ? site.title : required(data.title),
      description: demo ? site.description : required(data.description, 500),
      bookingUrl: safeBookingUrl(data.bookingUrl),
    },
    copy: Object.fromEntries(
      Object.entries(copy).map(([key, initial]) => [
        key,
        text(data[key], initial),
      ]),
    ),
    images: {},
    plans: demo ? plans : [],
    faqs: demo ? faqs : [],
  };
  result.copy.heroTitle = demo ? copy.heroTitle : required(data.heroTitle, 200);
  for (const name of imageNames)
    result.images[name] = image(
      data[`${name}Image`],
      `/images/gym-premium/${name}.webp`,
      text(
        data[`${name}Alt`],
        {
          hero: "トレーニング風景",
          reception: "ジムの受付",
          equipment: "トレーニング設備",
          trainer: "トレーナー紹介",
          studio: "ジムの内観",
        }[name],
        300,
      ),
    );
  if (!demo) {
    if (
      !Array.isArray(data.plans) ||
      data.plans.length < 1 ||
      data.plans.length > 3
    )
      throw new Error("料金プランは1〜3件設定してください。");
    result.plans = data.plans.map((plan) => {
      if (!plan || typeof plan !== "object")
        throw new Error("料金プランの形式が不正です。");
      if (
        !Number.isSafeInteger(plan.price) ||
        plan.price < 0 ||
        plan.price > 10000000
      )
        throw new Error("料金は0〜10000000の整数で設定してください。");
      const items = required(plan.items, 2000)
        .split(/\r?\n/)
        .map((x) => x.trim())
        .filter(Boolean);
      if (items.length < 1 || items.length > 10)
        throw new Error("プラン内容は1〜10項目で設定してください。");
      return {
        name: required(plan.name, 80),
        label: text(plan.label, "", 200),
        price: plan.price.toLocaleString("ja-JP"),
        featured: plan.featured === true,
        items,
      };
    });
    if (
      data.faqs != null &&
      (!Array.isArray(data.faqs) || data.faqs.length > 30)
    )
      throw new Error("FAQは30件以内で設定してください。");
    result.faqs = (data.faqs ?? []).map((item) => ({
      question: required(item?.question, 300),
      answer: required(item?.answer, 4000),
    }));
  }
  return result;
}
