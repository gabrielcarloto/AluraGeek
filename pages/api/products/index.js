import { prisma } from '../../../lib/db';
const password = process.env.PRODUCTS_PASSWORD;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const { body, headers } = req;

    if (headers['authorization'] !== password) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const productData = JSON.parse(body);

    const product = await prisma.product.create({ data: productData });

    res.status(201).json(product);
  } else if (req.method === 'PUT') {
    const { body, headers } = req;

    if (headers['authorization'] !== password) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const productData = JSON.parse(body);

    const product = await prisma.product.update({
      where: { id: productData.id },
      data: productData,
    });

    res.status(200).json(product);
  } else {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET', 'POST', 'PUT');
    res.end('Method Not Allowed');
  }
}
