import Image from "next/image";
import BookingButton from "../BookingButton";
export function HeroSection({ content }) {
  const { site, copy, images } = content;
  return (
    <section className="premium-hero" aria-labelledby="hero-title">
      <Image
        className="premium-hero-image"
        src={images.hero.src}
        alt={images.hero.alt}
        fill
        sizes="(max-width: 1400px) 100vw, 1400px"
        preload
      />
      <div className="premium-hero-content">
        <h1 id="hero-title" className="premium-editable">
          {copy.heroTitle}
        </h1>
        <p className="premium-editable">{copy.heroBody}</p>
        <BookingButton bookingUrl={site.bookingUrl}>
          体験を予約する
        </BookingButton>
      </div>
      <span className="premium-hero-caption">
        {site.name} — A MOMENT FOR YOURSELF
      </span>
    </section>
  );
}
