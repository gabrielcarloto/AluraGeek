import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function productCategoryHandler(req, res) {
  const {
    query: { category },
    method,
  } = req;

  const products = await prisma.product.findMany({
    where: { category },
  });

  if (method === "GET") {
    if (products.length === 0) {
      res.status(404).json({ error: "No products found" });
      return;
    }

    res.status(200).json(products);
  } else {
    res.statusCode = 405;
    res.setHeader("Allow", "GET");
    res.end("Method Not Allowed");
  }
}
