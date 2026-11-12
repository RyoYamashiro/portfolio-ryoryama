import Image from "next/image";
export default function Photo({ image, className = "" }) {
  return (
    <div className={`premium-photo ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 700px) 100vw, 50vw"
      />
    </div>
  );
}
