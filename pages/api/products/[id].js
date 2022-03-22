import { products } from "../../../data/products";

export default function productHandler(req, res) {
  const {
    query: { id },
    method,
  } = req;
  
  const filtered = products.filter(product => product.id === id);

  if (method === 'GET') {
    if (filtered.length === 0) {
      res.statusCode = 404;
      res.end("Product not found");
    } else {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(filtered[0]));
    };
  } else {
    res.statusCode = 405;
    res.setHeader("Allow", "GET");
    res.end("Method Not Allowed");
  };
};