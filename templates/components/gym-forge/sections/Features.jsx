import { features } from "../../../content/gym-forge/site";
import Photo from "../Photo";
import { Heading } from "../Ui";
export default function Features() {
  return (
    <section
      className="forge-features forge-dark"
      id="features"
      aria-labelledby="forge-features-title"
    >
      <div className="forge-shell forge-section-grid">
        <div className="forge-intro">
          <Heading label="FEATURES" id="forge-features-title">
            一人ひとりに合わせた、
            <br />
            現実的で続けられる指導。
          </Heading>
          <p>
            今の状態から、無理なく、でも着実に。
            <br />
            経験と科学的な知見をもとに、
            <br />
            あなたに合った方法でサポートします。
          </p>
          <a className="forge-text-link" href="#trial">
            体験で指導を確かめる <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="forge-feature-list">
          {features.map((feature, i) => (
            <article className="forge-feature" key={feature.photo}>
              <div className="forge-feature-image">
                <Photo name={feature.photo} />
                <span className="forge-number">0{i + 1}</span>
              </div>
              <div className="forge-feature-body">
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
