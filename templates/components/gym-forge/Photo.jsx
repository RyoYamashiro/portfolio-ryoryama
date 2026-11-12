import Image from "next/image";
import { photos } from "../../content/gym-forge/site";

// 枠のサイズはCSS、写真・代替テキスト・切り取り位置はcontentで管理します。
export default function Photo({ name, className = "", decorative = false }) {
  const { src, alt, position = "center" } = photos[name];
  return (
    <span className={`forge-photo ${className}`}>
      <Image
        src={src}
        alt={decorative ? "" : alt}
        fill
        sizes={name === "concept" || name === "facility"
          ? "(max-width: 600px) 100vw, 50vw"
          : "(max-width: 600px) 100vw, 33vw"}
        style={{ objectFit: "cover", objectPosition: position }}
      />
    </span>
  );
}
