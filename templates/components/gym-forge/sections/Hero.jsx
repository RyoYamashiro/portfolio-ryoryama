import Image from "next/image";
import Header from "../Header";
import BookingButton from "../BookingButton";
import { Icon } from "../Ui";
export default function Hero() {
  return (
    <section
      className="forge-hero"
      id="forge-top"
      aria-labelledby="forge-title"
    >
      <Image
        className="forge-hero-image"
        src="/images/gym-forge/hero.png"
        alt="ダンベルトレーニングに集中する男性と、フォームを見守るトレーナー"
        fill
        sizes="100vw"
        preload
      />
      <Header />
      <div className="forge-hero-content forge-shell">
        <h1 id="forge-title">
          <span>昨日より、</span>
          <span className="forge-red">できることを</span>
          <span>増やす。</span>
        </h1>
        <p className="forge-hero-description">
          続けるほど、仕事も、毎日も、面白くなる。
          <br />
          一人ひとりの目標に向き合う、
          <br />
          パーソナルトレーニングジムです。
        </p>
        <ul className="forge-hero-benefits">
          <li>
            <Icon name="station" />
            駅徒歩3分
          </li>
          <li>
            <Icon name="person" />
            完全個別指導
          </li>
          <li>
            <Icon name="dumbbell" />
            手ぶらでOK
          </li>
        </ul>
        <BookingButton>まずは体験で相談してみる</BookingButton>
      </div>
      <p className="forge-hero-sign">
        TRAIN TODAY
        <br />A STRONGER
        <br />
        TOMORROW
        <span />
      </p>
    </section>
  );
}
