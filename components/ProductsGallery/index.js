import Link from 'next/link';
import Image from 'next/image';
import Container from "../utils/Container";
import ProductsTitle from './ProductsTitle';
import Product from './Product';
import Grid from '../utils/Grid';

function ProductsGallery({ title, products }) {
  return (
    <section>
      <Container>
        <ProductsTitle title={title} />
        <Grid>
          {products.map(product => {
            return (
              <Link passHref href="/products/[id]" as={`/products/${product.id}`} key={product.id}>
                <Product>
                  <div className="product-image">
                    <Image src={product.image} alt={product.alt} width={500} height={500} objectFit="cover" />
                  </div>
                  <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">{product.price}</p>
                    <p className="product-link">Ver produto</p>
                  </div>
                </Product>
              </Link>
            )
          })}
        </Grid>
      </Container>
    </section>
  );
};

export default ProductsGallery;