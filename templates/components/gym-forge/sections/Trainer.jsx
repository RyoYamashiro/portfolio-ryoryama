import Photo from "../Photo";
import { Heading } from "../Ui";
export default function Trainer() {
  return (
    <section
      className="forge-trainer forge-dark"
      id="trainer"
      aria-labelledby="forge-trainer-title"
    >
      <div className="forge-trainer-intro">
        <Heading label="TRAINER" id="forge-trainer-title">
          あなたの挑戦に、
          <br />
          本気で向き合う。
        </Heading>
        <p>
          一人ひとりの目標に寄り添い、
          <br />
          現実的で続けられる方法でサポートします。
          <br />
          初めての方も安心してご相談ください。
        </p>
        <a className="forge-text-link" href="#trial">
          トレーナーと話してみる <span aria-hidden="true">→</span>
        </a>
      </div>
      <Photo name="trainer" className="forge-trainer-portrait" />
      <div className="forge-trainer-profile">
        <h3>
          山田 翔太 <span>Shota Yamada</span>
        </h3>
        <p className="forge-role">代表トレーナー</p>
        <div className="forge-credentials">
          <span>NSCA-CPT</span>
          <span>JATI-ATI</span>
        </div>
        <p>
          トレーニングを通して、日々の生活が少しでも前向きになることを大切にしています。初めての方も安心して取り組めるよう、丁寧にサポートします。
        </p>
        <div className="forge-trainer-gallery">
          <Photo name="facility" />
          <Photo name="form" />
          <Photo name="weights" />
        </div>
        <small className="forge-demo-note">
          ※ 人物・資格はデザイン確認用の仮情報です。
        </small>
      </div>
    </section>
  );
}
