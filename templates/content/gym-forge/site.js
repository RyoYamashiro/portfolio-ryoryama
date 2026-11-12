// FORGEは架空店舗のデモ。公開前に実店舗情報・料金・資格・素材を確認してください。
export const site = {
  name: "FORGE",
  subtitle: "PERSONAL GYM",
  title: "FORGE PERSONAL GYM | 昨日より、できることを増やす。",
  description:
    "一人ひとりの目標に向き合うパーソナルトレーニング。FORGEの指導方針・プログラム・料金・体験の流れをご紹介します。",
  bookingUrl: "",
};
export const navigation = [
  ["concept", "コンセプト"],
  ["features", "特徴"],
  ["program", "プログラム"],
  ["trainer", "トレーナー"],
  ["price", "料金"],
  ["trial", "体験の流れ"],
  ["facility", "施設・アクセス"],
  ["faq", "よくある質問"],
];
// 写真は独立した素材で管理。srcとaltを差し替えると各セクションに反映されます。
export const photos = {
  concept: { src: "/images/gym/feature-beginner.webp", alt: "トレーニングの合間に笑顔を見せる女性" },
  hearing: { src: "/images/gym/plan-health.webp", alt: "利用者と目線を合わせるトレーナー" },
  planning: { src: "/images/gym-forge/training.webp", alt: "利用者に合わせて動作を確認するトレーナー" },
  form: { src: "/images/gym/feature-coaching.webp", alt: "スクワットのフォームを指導するトレーナー" },
  record: { src: "/images/gym-forge/training.webp", alt: "身体の動きと進み具合を確認する個別指導" },
  shape: { src: "/images/gym-forge/training.webp", alt: "正しい姿勢を意識してスクワットする女性" },
  strength: { src: "/images/gym-forge/hero.png", alt: "ダンベルで筋力トレーニングする男性", position: "75% center" },
  running: { src: "/images/gym/blog-exercise.webp", alt: "無理のない運動習慣としてストレッチする女性" },
  trainer: { src: "/images/gym-forge/trainer.webp", alt: "FORGEのデモトレーナー、山田翔太", position: "center 25%" },
  facility: { src: "/images/gym-forge/facility.webp", alt: "自然光が入るパワーラックのあるジム内観" },
  weights: { src: "/images/gym-premium/equipment.webp", alt: "整頓されたトレーニング器具" },
};
export const features = [
  {
    title: "丁寧なヒアリング",
    body: "目標・生活習慣・運動経験をもとに、理想の姿を整理します。",
    photo: "hearing",
  },
  {
    title: "あなただけの計画",
    body: "無理なく続けられるトレーニングと生活習慣を一緒に考えます。",
    photo: "planning",
  },
  {
    title: "正しいフォーム指導",
    body: "効果と安全性を意識し、一つひとつ丁寧に確認します。",
    photo: "form",
  },
  {
    title: "進み具合の確認と調整",
    body: "定期的に変化を確認し、身体に合わせて計画を調整します。",
    photo: "record",
  },
];
export const programs = [
  {
    title: "身体を引き締めたい",
    body: "見た目を整え、鏡の前で自分に自信を持てる身体づくり。",
    photo: "shape",
  },
  {
    title: "筋力・体力を高めたい",
    body: "日常や仕事で疲れにくい、動ける身体をつくります。",
    photo: "strength",
  },
  {
    title: "運動習慣をつくりたい",
    body: "無理なく続けられる習慣を、生活の一部にしていきます。",
    photo: "running",
  },
];
export const plans = [
  { name: "月4回プラン", label: "まずは無理なく始めたい方に", price: "29,800" },
  {
    name: "月8回プラン",
    label: "しっかり継続して変化を感じたい方に",
    price: "56,000",
    featured: true,
  },
  {
    name: "月12回プラン",
    label: "短期間で集中的に取り組みたい方に",
    price: "78,000",
  },
];
export const planBenefits = [
  "トレーナーによる個別指導",
  "トレーニングメニュー作成",
  "食事アドバイス（希望者）",
];
export const extras = [
  ["入会金", "¥22,000"],
  ["体験トレーニング", "¥3,300（60分）"],
  ["レンタルウェア・タオル", "無料"],
  ["シューズ預かり", "無料"],
  ["プロテインドリンク", "無料"],
];
export const trial = [
  {
    icon: "calendar",
    title: "予約",
    body: "フォームまたはLINEからご希望の日時をご予約。",
  },
  {
    icon: "chat",
    title: "相談",
    body: "現在の状態や目標についてヒアリングします。",
  },
  {
    icon: "dumbbell",
    title: "体験",
    body: "実際にトレーニングを体験していただきます。",
  },
  {
    icon: "note",
    title: "ご提案",
    body: "今後のプランや通い方をご提案します。",
  },
];
export const faqs = [
  {
    question: "運動経験がなくても大丈夫ですか？",
    answer:
      "はい。体力や運動経験に合わせ、基本の動きから丁寧にご案内します。まずは体験で気になることをご相談ください。",
  },
  {
    question: "予約の変更やキャンセルはできますか？",
    answer:
      "変更・キャンセルの受付方法と期限は、実店舗の運用条件に合わせてご案内します。このページはデモのため、予約は受け付けていません。",
  },
  {
    question: "どのくらいの頻度で通えばよいですか？",
    answer:
      "目標と生活リズムを確認して、無理なく続けられる頻度を一緒に考えます。回数だけを増やすのではなく、継続できる計画を大切にしています。",
  },
  {
    question: "食事指導はどのような内容ですか？",
    answer:
      "普段の食生活を伺い、取り入れやすい工夫をご提案する想定です。具体的なサービス範囲は実店舗の提供内容に合わせて設定します。",
  },
  {
    question: "持ち物はありますか？",
    answer:
      "動きやすい服装、室内用シューズ、水分補給用の飲み物をご用意ください。レンタルの有無はご予約時にご確認ください。",
  },
  {
    question: "体験だけでも受けられますか？",
    answer:
      "体験で指導の雰囲気や施設をご確認いただき、その後にご検討いただける想定です。入会を強制することはありません。",
  },
];
