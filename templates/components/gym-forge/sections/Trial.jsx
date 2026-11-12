import { trial } from "../../../content/gym-forge/site";
import { Heading, Icon } from "../Ui";
export default function Trial() {
  return (
    <section
      className="forge-trial forge-dark"
      id="trial"
      aria-labelledby="forge-trial-title"
    >
      <div className="forge-shell forge-section-grid">
        <div className="forge-intro">
          <Heading label="TRIAL" id="forge-trial-title">
            体験の流れ
          </Heading>
          <p>
            初めての方も安心してお越しいただけるよう、
            <br />
            シンプルな流れをご用意しています。
          </p>
        </div>
        <ol className="forge-trial-list">
          {trial.map((step, i) => (
            <li key={step.title}>
              <span className="forge-step-number">0{i + 1}</span>
              <div className="forge-step-card">
                <h3>
                  <Icon name={step.icon} />
                  {step.title}
                </h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
