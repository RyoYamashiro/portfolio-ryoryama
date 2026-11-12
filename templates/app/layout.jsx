export const metadata = {
  title: { default: 'Headless Sample', template: '%s | Headless Sample' },
  description: 'Next.jsでヘッドレスCMSの仕組みを学ぶローカル教材',
};

export default function RootLayout({ children }) {
  return <html lang="ja"><body>{children}</body></html>;
}
