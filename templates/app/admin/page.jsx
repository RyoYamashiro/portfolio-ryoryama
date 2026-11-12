import { notFound } from 'next/navigation';
import { localCmsEnabled } from '../../cms/local-access.js';
export const dynamic = 'force-dynamic';
import Editor from './editor';
export const metadata = { title: '管理画面' };
export default function AdminPage() {
  if (!localCmsEnabled()) notFound();
  return <><header><h1>記事の管理</h1><p>ローカル学習用の小さなCMSです。</p><a href="/">閲覧画面へ</a></header><main><Editor /></main></>;
}
