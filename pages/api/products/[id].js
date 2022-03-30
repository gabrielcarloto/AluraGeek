import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } else {
    res.statusCode = 405;
    res.setHeader("Allow", "GET");
    res.end("Method Not Allowed");
  };
};