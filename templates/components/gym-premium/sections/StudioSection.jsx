import Photo from "../ui/Photo";
import DetailsDialog from "../DetailsDialog";
export function StudioSection({ content }) {
  const { site, copy, images, demo } = content;
  return (
    <section id="studio" className="premium-split premium-studio">
      <Photo image={images.studio} />
      <div className="premium-copy">
        <p className="premium-eyebrow">SPACE & ACCESS</p>
        <h2 className="premium-editable">{copy.studioTitle}</h2>
        <p className="premium-editable">{copy.studioBody}</p>
        <DetailsDialog
          label="空間・アクセスを見る"
          title={`${site.name} ${site.label}`}
        >
          {demo && <p>完全予約制のプライベートジムを想定したデザインです。</p>}
          <dl>
            <dt>所在地・最寄り駅</dt>
            <dd className="premium-editable">{copy.address}</dd>
            <dt>営業時間・設備</dt>
            <dd className="premium-editable">{copy.hours}</dd>
          </dl>
          {demo && <p>このデモには実在する店舗・予約先はありません。</p>}
        </DetailsDialog>
      </div>
    </section>
  );
}
