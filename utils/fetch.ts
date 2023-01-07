export const fetcher = <T = unknown>(url: string) =>
  fetch(url).then<T>((r) => r.json());
