export const fetcher = async <T = unknown>(url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const body = await response.json().catch(() => undefined);
    throw new Error(body?.error ?? `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
};
