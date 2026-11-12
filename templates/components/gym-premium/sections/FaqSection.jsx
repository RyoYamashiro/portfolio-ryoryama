export function FaqSection({ content }) {
  const { faqs } = content;
  if (!faqs.length)
    return (
      <section id="faq" className="premium-faq">
        <h2>よくあるご質問</h2>
        <p>ご不明な点は体験時にお尋ねください。</p>
      </section>
    );
  return (
    <section id="faq" className="premium-faq">
      <div>
        <p className="premium-eyebrow">FAQ</p>
        <h2>よくあるご質問</h2>
        <p>
          はじめての方にも安心してご利用いただけるよう、
          <br />
          よくいただくご質問をまとめました。
        </p>
      </div>
      <div className="premium-faq-list">
        {faqs.map((item, index) => (
          <details key={index}>
            <summary>
              {item.question}
              <span aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
