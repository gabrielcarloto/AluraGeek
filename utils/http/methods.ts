import type { NextApiResponse } from 'next';

import { STATUS } from './status';

type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * Returns `Method Not Allowed` status and the `Allow` header with the methods
 * passed as arguments
 */
export function allowedHttpMethods(
  res: NextApiResponse,
  ...methods: HTTPMethods[]
) {
  res.statusCode = STATUS.METHOD_NOT_ALLOWED;
  res.setHeader('Allow', methods);
  res.end('Method Not Allowed');
}
