import type { Product } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { createProduct, getManyProducts, updateProduct } from '@lib/prisma';
import { authAdminAction } from '@utils/admin';
import { allowedHttpMethods, STATUS } from '@utils/http';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET': {
      const products = await getManyProducts();
      return res.status(STATUS.OK).json(products);
    }
    case 'POST': {
      authAdminAction(req, res);
      const productData: Product = JSON.parse(req.body);
      const product = createProduct(productData);

      return res.status(STATUS.CREATED).json(product);
    }
    case 'PUT': {
      authAdminAction(req, res);
      const productData: Product = JSON.parse(req.body);
      const product = await updateProduct(productData.id, productData);

      return res.status(STATUS.OK).json(product);
    }

    default:
      return allowedHttpMethods(res, 'GET', 'POST', 'PUT');
  }
}
