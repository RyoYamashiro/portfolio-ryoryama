export default function Brand({ site }) {
  return (
    <a className="brand" href="#top" aria-label={`${site.name} トップへ`}>
      <span className="brand-main">
        <span>{site.name.split(" ")[0]}</span>{" "}
        {site.name.split(" ").slice(1).join(" ")}
      </span>
      <span className="brand-sub">{site.subtitle}</span>
    </a>
  );
}
