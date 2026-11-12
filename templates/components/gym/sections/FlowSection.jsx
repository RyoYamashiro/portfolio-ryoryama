import Icon from "../ui/Icon";

export default function FlowSection() {
  return (
    <section
      className="flow-section section"
      id="flow"
      aria-labelledby="flow-title"
    >
      <div className="page-shell flow-layout">
        <div className="section-intro reveal">
          <span className="eyebrow">FLOW</span>
          <h2 id="flow-title">
            ご利用の流れ
            <br />
            はじめての方でも安心
          </h2>
        </div>
        <ol className="flow-steps reveal">
          <li>
            <span className="flow-number">01</span>
            <Icon name="calendar" />
            <strong>無料カウンセリング予約</strong>
            <small>WEBまたはお電話で簡単予約</small>
          </li>
          <li>
            <span className="flow-number">02</span>
            <Icon name="chat" />
            <strong>カウンセリング</strong>
            <small>お悩みや目標をヒアリング</small>
          </li>
          <li>
            <span className="flow-number">03</span>
            <Icon name="file" />
            <strong>プランのご提案</strong>
            <small>最適なプランをご提案</small>
          </li>
          <li>
            <span className="flow-number">04</span>
            <Icon name="dumbbell2" />
            <strong>トレーニング開始</strong>
            <small>あなただけのプログラムで開始</small>
          </li>
        </ol>
      </div>
    </section>
  );
}
