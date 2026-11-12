export default function FeatureIcon({ type }) {
  return (
    <svg
      viewBox="0 0 36 36"
      width="36"
      height="36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden="true"
    >
      {type === "bars" ? (
        <>
          <path d="M5 21h5v12H5zM15 13h5v20h-5zM25 4h5v29h-5z" />
        </>
      ) : type === "person" ? (
        <>
          <circle cx="18" cy="10" r="6" />
          <path d="M7 32v-4c0-7 5-11 11-11s11 4 11 11v4Z" />
        </>
      ) : (
        <>
          <path d="M7 29C0 12 15 5 31 5c0 18-9 29-22 23M5 33 24 13M13 24l-1-9M18 19h8" />
        </>
      )}
    </svg>
  );
}
