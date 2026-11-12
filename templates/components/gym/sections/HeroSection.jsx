import Icon from "../ui/Icon";

export default function HeroSection({ site, copy, hero }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div
        className="hero-photo"
        role="img"
        aria-label={hero.alt}
        style={{ backgroundImage: `url(${JSON.stringify(hero.src)})` }}
      ></div>
      <div className="hero-content page-shell">
        <div className="hero-copy">
          <h1 id="hero-title" className="preserve-lines">
            {copy.heroTitle}
          </h1>
          <p className="hero-description preserve-lines">
            {site.name}は、
            <br />
            {copy.heroBody}
          </p>
          <div className="hero-benefits" aria-label="ジムの特徴">
            <div className="hero-benefit">
              <Icon name="dumbbell2" />
              <span>
                完全個室
                <br />
                マンツーマン指導
              </span>
            </div>
            <div className="hero-benefit">
              <Icon name="food" />
              <span>
                食事サポート
                <br />
                で無理なく続く
              </span>
            </div>
            <div className="hero-benefit">
              <Icon name="shoe" />
              <span>
                初心者でも安心
                <br />
                丁寧なサポート
              </span>
            </div>
          </div>
          <a className="btn btn-primary hero-cta" href="#contact">
            無料カウンセリングを予約する <Icon name="arrow" />
          </a>
          <span className="cta-caption">＼ たった30秒で簡単予約 ／</span>
        </div>
      </div>
    </section>
  );
}
