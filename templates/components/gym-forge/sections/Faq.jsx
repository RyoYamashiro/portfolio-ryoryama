import { faqs } from "../../../content/gym-forge/site";
import { Heading } from "../Ui";
export default function Faq() {
  return (
    <section
      className="forge-faq forge-light"
      id="faq"
      aria-labelledby="forge-faq-title"
    >
      <div className="forge-shell forge-faq-layout">
        <Heading label="FAQ" id="forge-faq-title">
          よくある質問
        </Heading>
        <div className="forge-faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <span aria-hidden="true" />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
