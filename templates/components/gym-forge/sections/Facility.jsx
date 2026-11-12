import Photo from "../Photo";
import { Heading } from "../Ui";
export default function Facility() {
  return (
    <section
      className="forge-facility forge-light"
      id="facility"
      aria-labelledby="forge-facility-title"
    >
      <div className="forge-shell forge-facility-layout">
        <div>
          <Heading label="FACILITY" id="forge-facility-title">
            施設・アクセス
          </Heading>
          <p>
            落ち着いてトレーニングに集中できる
            <br />
            プライベート空間です。
          </p>
        </div>
        <Photo name="facility" />
        <dl>
          <div>
            <dt>所在地</dt>
            <dd>東京都渋谷区神南1-1-1 FORGEビル2F（ダミー）</dd>
          </div>
          <div>
            <dt>アクセス</dt>
            <dd>渋谷駅 徒歩3分（設定例）</dd>
          </div>
          <div>
            <dt>営業時間</dt>
            <dd>8:00 - 22:00（最終受付 21:00）</dd>
          </div>
          <div>
            <dt>設備</dt>
            <dd>
              パワーラック・ダンベル・有酸素マシン・更衣室・
              <br />
              レンタルウェア・タオル・プロテインドリンク
            </dd>
          </div>
        </dl>
        <figure className="forge-facility-map">
          <iframe
            title="渋谷駅周辺の地図（デモ用）"
            src="https://www.google.com/maps?output=embed&q=Shibuya%20Station&hl=ja"
            width="1200"
            height="360"
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <figcaption>
            デモ用に渋谷駅周辺を表示しています。実際の店舗所在地ではありません。
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
