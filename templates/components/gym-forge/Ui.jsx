export function Heading({ label, children, id, className = "" }) {
  return (
    <div className={`forge-heading ${className}`}>
      <p className="forge-eyebrow">{label}</p>
      <h2 id={id}>{children}</h2>
    </div>
  );
}
export function Icon({ name, ...props }) {
  const paths = {
    calendar: (
      <>
        <rect x="4" y="5" width="16" height="16" rx="1" />
        <path d="M8 2v6m8-6v6M4 10h16m-12 4h3v3H8z" />
      </>
    ),
    chat: (
      <>
        <path d="M3 4h14v11H8l-5 4V4Z" />
        <path d="M19 8h3v14l-5-4h-5" />
      </>
    ),
    dumbbell: (
      <>
        <path d="M7 6v12M3 8v8m14-10v12m4-10v8M7 12h10M3 9h4m10 0h4M3 15h4m10 0h4" />
      </>
    ),
    note: (
      <>
        <path d="M6 3h9l4 4v14H6zM14 3v5h5M9 12h7m-7 4h7" />
      </>
    ),
    person: (
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21v-3a8 8 0 0 1 16 0v3z" />
      </>
    ),
    station: (
      <>
        <rect x="5" y="2" width="14" height="17" rx="3" />
        <path d="M5 11h14M9 5h6M7 22l3-3m7 3-3-3M8 15h1m6 0h1" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.dumbbell}
    </svg>
  );
}
