const shapes = {
  arrow: (
    <>
      {" "}
      <path d="M4 12h16m-7-7 7 7-7 7" />{" "}
    </>
  ),
  left: (
    <>
      {" "}
      <path d="m14 5-7 7 7 7" />{" "}
    </>
  ),
  right: (
    <>
      {" "}
      <path d="m10 5 7 7-7 7" />{" "}
    </>
  ),
  plus: (
    <>
      {" "}
      <path d="M12 5v14M5 12h14" />{" "}
    </>
  ),
  dumbbell: (
    <>
      {" "}
      <path
        d="m6.5 6.5 11 11M3 9l6-6m6 18 6-6M1.5 11.5l10-10m1 21 10-10M9 3l12 12"
        transform="rotate(-45 12 12)"
      />{" "}
    </>
  ),
  dumbbell2: (
    <>
      {" "}
      <path d="M3 8v8m3-11v14M18 5v14m3-11v8M6 12h12M1 10v4m22-4v4" />{" "}
    </>
  ),
  food: (
    <>
      {" "}
      <path d="M4 2v7a3 3 0 0 0 6 0V2M7 2v20m9-12V4c0-2.2 4-2.2 4 0v18m0-11h-4" />{" "}
    </>
  ),
  shoe: (
    <>
      {" "}
      <path d="m2 16 5-4 4-7 3 3-1 3c2 2 4 3 8 4l1 4H3a2 2 0 0 1-1-3Z" />
      <path d="m5 15 3 2m1-5 3 3" />{" "}
    </>
  ),
  calendar: (
    <>
      {" "}
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v5m10-5v5M3 11h18" />{" "}
    </>
  ),
  chat: (
    <>
      {" "}
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9.3 9.3 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5Z" />{" "}
    </>
  ),
  file: (
    <>
      {" "}
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" />
      <path d="M13 2v7h7M8 14h8m-8 4h6" />{" "}
    </>
  ),
  phone: (
    <>
      {" "}
      <path d="M22 16.9V20a2 2 0 0 1-2.2 2A19 19 0 0 1 2 4.2 2 2 0 0 1 4 2h3.1a2 2 0 0 1 2 1.7l.6 3.2a2 2 0 0 1-.6 1.8L7.2 10a15 15 0 0 0 6.8 6.8l1.3-1.9a2 2 0 0 1 1.8-.6l3.2.6a2 2 0 0 1 1.7 2Z" />{" "}
    </>
  ),
  menu: (
    <>
      {" "}
      <path d="M4 7h16M4 12h16M4 17h16" />{" "}
    </>
  ),
  x: (
    <>
      {" "}
      <path d="m5 5 14 14M19 5 5 19" />{" "}
    </>
  ),
  check: (
    <>
      {" "}
      <path d="m5 12 4 4L19 6" />{" "}
    </>
  ),
};

export default function Icon({ name, className = "icon" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {shapes[name]}
    </svg>
  );
}
