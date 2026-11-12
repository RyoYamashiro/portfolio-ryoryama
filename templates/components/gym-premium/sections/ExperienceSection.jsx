import Photo from "../ui/Photo";
import FeatureIcon from "../ui/FeatureIcon";
export function ExperienceSection({ content }) {
  const { copy, images } = content;
  return (
    <section id="experience" className="premium-split premium-experience">
      <Photo image={images.equipment} />
      <div className="premium-copy">
        <p className="premium-eyebrow">FEATURE</p>
        <h2 className="premium-editable">{copy.featureTitle}</h2>
        <p className="premium-editable">{copy.featureBody}</p>
        <div className="premium-features">
          {[
            ["bars", "目的に合わせた", "最適なメニュー"],
            ["person", "マンツーマン指導で", "丁寧なサポート"],
            ["leaf", "無理なく続く", "ライフスタイルに"],
          ].map(([type, line1, line2]) => (
            <div key={type}>
              <FeatureIcon type={type} />
              <p>
                {line1}
                <br />
                {line2}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
