import Brand from "./ui/Brand";

export default function SiteFooter({ site }) {
  return (
    <footer className="footer">
      <div className="page-shell footer-inner">
        <Brand site={site} />
        <p>© {site.name}. All rights reserved.</p>
        <a href="#top">ページの先頭へ ↑</a>
      </div>
    </footer>
  );
}
