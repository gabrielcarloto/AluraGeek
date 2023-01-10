import type { NextApiRequest, NextApiResponse } from 'next';

import { getManyProducts } from '@lib/prisma';
import { allowedHttpMethods, STATUS } from '@utils/http';

export default async function productCategoryHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { category },
    method,
  } = req;

  switch (method) {
    case 'GET': {
      const products = await getManyProducts({
        filter: { category: category as string },
      });

      if (products?.length === 0)
        return res
          .status(STATUS.NOT_FOUND)
          .json({ error: 'No products found' });

      return res.status(200).json(products);
    }

    default:
      return allowedHttpMethods(res, 'GET');
  }
}
