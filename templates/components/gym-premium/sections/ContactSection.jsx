import BookingButton from "../BookingButton";
export function ContactSection({ content }) {
  const { site, copy } = content;
  return (
    <section className="premium-contact">
      <div>
        <h2 className="premium-editable">{copy.contactTitle}</h2>
        <p className="premium-editable">{copy.contactBody}</p>
        <BookingButton bookingUrl={site.bookingUrl}>
          体験を予約する
        </BookingButton>
      </div>
    </section>
  );
}
