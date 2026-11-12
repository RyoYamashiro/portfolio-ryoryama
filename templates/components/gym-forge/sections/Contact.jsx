import BookingButton from "../BookingButton";
export default function Contact() {
  return (
    <section className="forge-contact" aria-labelledby="forge-contact-title">
      <div>
        <p>まずは、今の自分のことを話してみませんか？</p>
        <h2 id="forge-contact-title">体験トレーニングのご予約はこちら</h2>
        <BookingButton />
      </div>
    </section>
  );
}
