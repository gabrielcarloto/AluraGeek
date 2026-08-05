// const DEV_ENV = process.env.NODE_ENV !== 'production';

export const BASE_URL = process.env['BASE_URL'];

/**
 * Builds an API URL for a given path (e.g. `/products/5`).
 *
 * - On the server, `BASE_URL` is available and Node's `fetch` requires an
 *   absolute URL, so the full URL is built.
 * - On the client, custom env vars are not inlined into the browser bundle,
 *   so `BASE_URL` is `undefined` and we fall back to a same-origin relative
 *   URL (the API is always served from the same origin).
 */
export const getApiUrl = (path: string) => (BASE_URL ? `${BASE_URL}/api${path}` : `/api${path}`);
