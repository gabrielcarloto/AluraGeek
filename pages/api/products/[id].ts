import type { NextApiRequest, NextApiResponse } from 'next';

import { deleteProduct, getUniqueProduct } from '@lib/prisma';
import { adminAction } from '@utils/admin';
import { allowedHttpMethods, STATUS } from '@utils/http';

export default async function productHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  if (method !== 'GET' && method !== 'DELETE') {
    return allowedHttpMethods(res, 'GET', 'DELETE');
  }

  const productId = parseInt(id as string);

  if (Number.isNaN(productId)) {
    return res.status(STATUS.BAD_REQUEST).json({ error: 'Invalid product id' });
  }

  const product = await getUniqueProduct(productId);

  if (!product) {
    return res.status(STATUS.NOT_FOUND).json({ error: 'Product not found' });
  }

  switch (method) {
    case 'GET':
      return res.status(STATUS.OK).json(product);
    case 'DELETE': {
      return adminAction(req, res, async () => {
        await deleteProduct(productId);
        return res.status(STATUS.OK).json({ success: true });
      });
    }
  }
}
