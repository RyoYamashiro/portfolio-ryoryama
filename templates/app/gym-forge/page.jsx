import { site } from "../../content/gym-forge/site";
import Hero from "../../components/gym-forge/sections/Hero";
import Concept from "../../components/gym-forge/sections/Concept";
import Features from "../../components/gym-forge/sections/Features";
import Programs from "../../components/gym-forge/sections/Programs";
import Trainer from "../../components/gym-forge/sections/Trainer";
import Price from "../../components/gym-forge/sections/Price";
import Trial from "../../components/gym-forge/sections/Trial";
import Facility from "../../components/gym-forge/sections/Facility";
import Faq from "../../components/gym-forge/sections/Faq";
import Contact from "../../components/gym-forge/sections/Contact";
import "../../styles/gym-forge/index.css";

export const metadata = {
  title: { absolute: site.title },
  description: site.description,
  robots: { index: false, follow: false },
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    locale: "ja_JP",
  },
};
export const viewport = { themeColor: "#071013" };
export default function ForgePage() {
  return (
    <div className="forge-site">
      <a className="forge-skip" href="#concept">
        本文へ移動
      </a>
      <main>
        <Hero />
        <Concept />
        <Features />
        <Programs />
        <Trainer />
        <Price />
        <Trial />
        <Facility />
        <Faq />
        <Contact />
      </main>
      <footer className="forge-footer">
        <a className="forge-brand" href="#forge-top">
          <strong>FORGE</strong>
          <small>PERSONAL GYM</small>
        </a>
        <p>架空店舗のデザインデモです。人物・価格・所在地は仮情報です。</p>
        <a href="#forge-top">ページの先頭へ ↑</a>
      </footer>
    </div>
  );
}
