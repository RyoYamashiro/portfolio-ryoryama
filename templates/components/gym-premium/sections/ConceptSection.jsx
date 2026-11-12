import Photo from "../ui/Photo";
export function ConceptSection({ content }) {
  const { copy, images } = content;
  return (
    <section id="concept" className="premium-split premium-concept">
      <div className="premium-copy">
        <p className="premium-eyebrow">CONCEPT</p>
        <h2 className="premium-editable">{copy.conceptTitle}</h2>
        <p className="premium-editable">{copy.conceptBody}</p>
      </div>
      <Photo image={images.reception} />
    </section>
  );
}
