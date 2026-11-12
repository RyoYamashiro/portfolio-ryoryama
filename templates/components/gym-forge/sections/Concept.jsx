import Photo from "../Photo";
import { Heading } from "../Ui";
export default function Concept() {
  return (
    <section
      className="forge-concept forge-light"
      id="concept"
      aria-labelledby="forge-concept-title"
    >
      <div className="forge-concept-copy">
        <Heading label="CONCEPT" id="forge-concept-title">
          動ける自分が、
          <br />
          人生を変えていく。
        </Heading>
        <p>
          体重だけでなく、姿勢・体力・集中力。
          <br />
          毎日の動きやすさまで。
          <br />
          トレーニングを通して、仕事もプライベートも
          <br className="forge-desktop-break" />
          前向きに楽しめる自分をつくります。
        </p>
        <a className="forge-text-link" href="#features">
          私たちが大切にしていること <span aria-hidden="true">→</span>
        </a>
      </div>
      <Photo name="concept" className="forge-concept-photo" />
    </section>
  );
}
