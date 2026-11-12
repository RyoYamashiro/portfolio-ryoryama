import Header from "../../components/gym-premium/Header";
import BookingButton from "../../components/gym-premium/BookingButton";
import {
  HeroSection,
  ConceptSection,
  ExperienceSection,
  TrainerSection,
  PlansSection,
  StudioSection,
  FaqSection,
  ContactSection,
} from "../../components/gym-premium/Sections";
import { navigation } from "../../content/gym-premium/site";
import "../../styles/gym-premium/index.css";
import { getPremiumGym } from "../../cms/microcms/gym";

export const dynamic = "force-dynamic";
export async function generateMetadata() {
  const { site } = await getPremiumGym();
  return {
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
}
export const viewport = { themeColor: "#f9f8f4" };
export default async function PremiumGymPage() {
  const content = await getPremiumGym();
  const { site } = content;
  return (
    <div className="premium-site" id="top">
      <a className="premium-skip" href="#premium-main">
        本文へ移動
      </a>
      <Header site={site} />
      <main id="premium-main">
        <HeroSection content={content} />
        <ConceptSection content={content} />
        <ExperienceSection content={content} />
        <TrainerSection content={content} />
        <PlansSection content={content} />
        <StudioSection content={content} />
        <FaqSection content={content} />
        <ContactSection content={content} />
      </main>
      <footer className="premium-footer">
        <div className="premium-footer-main">
          <a className="premium-brand" href="#top">
            {site.name}
            <span>{site.label}</span>
          </a>
          <nav aria-label="フッターナビゲーション">
            {navigation.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <BookingButton
            bookingUrl={site.bookingUrl}
            className="premium-button premium-button-small"
          >
            体験を予約する
          </BookingButton>
        </div>
        <div className="premium-footer-note">
          <p>
            架空のジムのデザインデモです。写真・サービス・料金はサンプルです。
          </p>
          <a href="/">STELLAのテンプレートを見る ↗</a>
          <small>
            © {site.name} {site.label}
          </small>
        </div>
      </footer>
    </div>
  );
}
