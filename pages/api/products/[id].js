import { PrismaClient } from '@prisma/client';

const prisma = global.prisma || new PrismaClient();
const password = process.env.PRODUCTS_PASSWORD;

export default async function productHandler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const productId = parseInt(id);

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (method === 'GET') {
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.status(200).json(product);
  } else if (method === 'DELETE') {
    if (req.headers.authorization !== password) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    res.status(200).json({ success: true });
  } else {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET', 'DELETE');
    res.end('Method Not Allowed');
  }
}
