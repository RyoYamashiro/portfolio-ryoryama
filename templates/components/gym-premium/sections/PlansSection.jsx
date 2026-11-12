import BookingButton from "../BookingButton";
export function PlansSection({ content }) {
  const { site, copy, plans } = content;
  return (
    <section id="plans" className="premium-plans">
      <div className="premium-price-intro">
        <p className="premium-eyebrow">PRICE</p>
        <h2>料金プラン</h2>
        <p>
          目的やライフスタイルに合わせて、
          <br />
          {plans.length}つのプランをご用意しています。
          <br />
          まずはお気軽にご相談ください。
        </p>
        <BookingButton
          bookingUrl={site.bookingUrl}
          className="premium-button premium-button-small"
        >
          カウンセリングを相談する
        </BookingButton>
      </div>
      <div
        className="premium-plan-grid"
        style={{ "--plan-count": plans.length }}
      >
        {plans.map((plan, index) => (
          <article
            className={`premium-plan ${plan.featured ? "is-featured" : ""}`}
            key={index}
          >
            {plan.featured && (
              <span className="premium-plan-ribbon">おすすめプラン</span>
            )}
            <h3>{plan.name}</h3>
            <p className="premium-plan-description">{plan.label}</p>
            <ul>
              {plan.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="premium-price">
              ¥ <strong>{plan.price}</strong>
              <span> / 月（税込）</span>
            </p>
          </article>
        ))}
      </div>
      <p className="premium-price-note premium-editable">{copy.priceNote}</p>
    </section>
  );
}
