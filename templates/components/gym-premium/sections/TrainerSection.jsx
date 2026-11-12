import Photo from "../ui/Photo";
import DetailsDialog from "../DetailsDialog";
export function TrainerSection({ content }) {
  const { copy, images, demo } = content;
  return (
    <section id="trainer" className="premium-split premium-trainer">
      <div className="premium-copy">
        <p className="premium-eyebrow">TRAINER</p>
        <h2 className="premium-editable">{copy.trainerTitle}</h2>
        <p className="premium-editable">{copy.trainerBody}</p>
        <DetailsDialog
          label="トレーナー紹介を見る"
          title="一緒に、あなたのペースで。"
        >
          <p className="premium-editable">{copy.trainerDetail}</p>
          {demo && (
            <p>
              掲載写真はイメージです。公開時に担当者のプロフィールを設定します。
            </p>
          )}
        </DetailsDialog>
      </div>
      <Photo image={images.trainer} />
    </section>
  );
}
