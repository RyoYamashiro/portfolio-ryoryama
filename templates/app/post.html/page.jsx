import { redirect } from 'next/navigation';
export default async function LegacyPost({ searchParams }) {
  const { id } = await searchParams;
  redirect(typeof id === 'string' && id ? `/posts/${encodeURIComponent(id)}` : '/');
}
