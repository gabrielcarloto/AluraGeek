import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const { body } = req;
    const productData = JSON.parse(body);
    console.log(productData);

    const product = await prisma.product.create({ data: productData });

    res.status(201).json(product);
  } else {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET', 'POST');
    res.end('Method Not Allowed');
  }
}