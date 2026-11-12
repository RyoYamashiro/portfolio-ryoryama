import { plans, planBenefits, extras } from "../../../content/gym-forge/site";
import { Heading } from "../Ui";
export default function Price() {
  return (
    <section
      className="forge-price forge-light"
      id="price"
      aria-labelledby="forge-price-title"
    >
      <div className="forge-shell">
        <Heading label="PRICE" id="forge-price-title">
          分かりやすい料金プラン。
        </Heading>
        <p className="forge-price-intro">
          目的や生活スタイルに合わせて選べるプランをご用意しています。
          <br />
          すべてのプランにトレーナーによる個別指導が含まれます。
        </p>
        <div className="forge-price-layout">
          <div className="forge-plan-list">
            {plans.map((plan) => (
              <article
                className={`forge-plan ${plan.featured ? "is-featured" : ""}`}
                key={plan.name}
              >
                {plan.featured && (
                  <div className="forge-plan-ribbon">おすすめプラン</div>
                )}
                <h3>{plan.name}</h3>
                <p className="forge-plan-description">{plan.label}</p>
                <p className="forge-plan-price">
                  <span>¥</span>
                  {plan.price}
                  <small>/ 月</small>
                </p>
                <p className="forge-plan-time">1回 60分</p>
                <ul>
                  {planBenefits.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <aside className="forge-extras" aria-label="その他の費用">
            <h3>その他の費用</h3>
            <dl>
              {extras.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p>
              ※価格はすべて税込です。
              <br />
              ※プラン内容は変更となる場合があります。
            </p>
            <p>
              月4回プランの初月合計：<strong>¥51,800</strong>
              <br />
              （入会金＋月額。体験料は別途）
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
