export async function request(path, { method = 'GET', body, signal } = {}) {
  const response = await fetch(path, {
    method, signal, cache: 'no-store',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || '通信に失敗しました。');
  return data;
}
export function errorMessage(error) {
  return error instanceof TypeError
    ? '通信できませんでした。サーバーを確認して再読み込みしてください。'
    : error.message;
}
