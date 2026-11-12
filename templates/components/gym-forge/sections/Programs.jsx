import { programs } from "../../../content/gym-forge/site";
import Photo from "../Photo";
import { Heading } from "../Ui";
export default function Programs() {
  return (
    <section
      className="forge-program forge-light"
      id="program"
      aria-labelledby="forge-program-title"
    >
      <div className="forge-shell forge-section-grid">
        <div className="forge-intro">
          <Heading label="PROGRAM" id="forge-program-title">
            目的から選べる
            <br />
            トレーニングプログラム。
          </Heading>
          <p>
            体重の変化だけでなく、見た目・体力・
            <br />
            動きやすさ・自信など、あなたの目的に合わせて
            <br className="forge-desktop-break" />
            プログラムを設計します。
          </p>
        </div>
        <div className="forge-program-list">
          {programs.map((program) => (
            <article key={program.photo}>
              <Photo name={program.photo} />
              <div>
                <h3>{program.title}</h3>
                <p>{program.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
