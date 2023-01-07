import React from 'react';

import type { Product as IProduct } from '../../types';
import Product from '../Product/index';
import ProductSkeleton from '../Product/ProductSkeleton';
import Container from '../utils/Container';
import Grid from '../utils/Grid';
import ProductsTitle from './ProductsTitle';

interface ProductsGalleryProps {
  title: string;
  isSmall: boolean;
  products: IProduct[];
  link?: string;
}

function ProductsGallery({
  title,
  isSmall,
  products,
  link,
}: ProductsGalleryProps) {
  return (
    <section>
      <Container>
        <ProductsTitle title={title} link={link} categoryAll />
        <Grid>
          {products.length > 0 ? (
            products.map((product) => (
              <Product product={product} key={product.id} />
            ))
          ) : (
            <ProductSkeleton length={isSmall ? 4 : 6} />
          )}
        </Grid>
      </Container>
    </section>
  );
}

export default ProductsGallery;
