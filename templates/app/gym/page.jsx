import ThemePreview from "../../components/gym/ThemePreview";
import SiteHeader from "../../components/gym/SiteHeader";
import SiteFooter from "../../components/gym/SiteFooter";
import HeroSection from "../../components/gym/sections/HeroSection";
import FeaturesSection from "../../components/gym/sections/FeaturesSection";
import CoursesSection from "../../components/gym/sections/CoursesSection";
import TrainersSection from "../../components/gym/sections/TrainersSection";
import FlowSection from "../../components/gym/sections/FlowSection";
import VoicesSection from "../../components/gym/sections/VoicesSection";
import FaqSection from "../../components/gym/sections/FaqSection";
import BlogSection from "../../components/gym/sections/BlogSection";
import ContactSection from "../../components/gym/sections/ContactSection";
import RevealEffects from "../../components/gym/ui/RevealEffects";
import { getStellaGym } from "../../cms/microcms/stella.js";
import "../../styles/gym/index.css";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const { site } = await getStellaGym();
  return {
    robots: { index: false, follow: false },
    title: { absolute: site.title },
    description: site.description,
    openGraph: {
      title: site.title,
      description: site.description,
      type: "website",
      locale: "ja_JP",
    },
  };
}

export const viewport = { themeColor: "#0798ad" };

// 上から表示順に並んでいます。セクションの追加・並べ替えはここで行います。
export default async function GymPage() {
  const { site, copy, hero, courses, trainers, faqs } = await getStellaGym();
  return (
    <ThemePreview>
      <SiteHeader site={site} />
      <main>
        <HeroSection site={site} copy={copy} hero={hero} />
        <FeaturesSection site={site} />
        <CoursesSection courses={courses} />
        <TrainersSection trainers={trainers} />
        <FlowSection />
        <VoicesSection />
        <FaqSection faqs={faqs} />
        <BlogSection />
        <ContactSection site={site} copy={copy} />
      </main>
      <SiteFooter site={site} />
      <RevealEffects />
    </ThemePreview>
  );
}
