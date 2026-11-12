import { PostDetail } from '../../posts-view';
export const metadata = { title: '記事詳細' };
export default async function PostPage({ params }) {
  const { id } = await params;
  return <><nav><a href="/">記事一覧に戻る</a></nav><main><PostDetail id={id} /></main></>;
}
