import type { NextApiRequest, NextApiResponse } from 'next';

import { deleteProduct, getUniqueProduct } from '@lib/prisma';
import { authAdminAction } from '@utils/admin';
import { allowedHttpMethods, STATUS } from '@utils/http';

export default async function productHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id },
    method,
  } = req;

  const productId = parseInt(id as string);
  const product = await getUniqueProduct(productId);

  if (!product) {
    res.status(STATUS.NOT_FOUND).json({ error: 'Product not found' });
    return;
  }

  switch (method) {
    case 'GET':
      return res.status(STATUS.OK).json(product);
    case 'DELETE': {
      authAdminAction(req, res);
      await deleteProduct(productId);
      return res.status(STATUS.OK).json({ success: true });
    }

    default:
      return allowedHttpMethods(res, 'GET', 'DELETE');
  }
}
