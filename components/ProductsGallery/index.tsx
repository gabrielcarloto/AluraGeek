import React from 'react';
import type { Product as IProduct } from '@prisma/client';

import Product from '@components/Product';
import ProductSkeleton from '@components/Product/ProductSkeleton';
import Container from '@components/utils/Container';
import Grid from '@components/utils/Grid';

import ProductsTitle from './ProductsTitle';

interface ProductsGalleryProps {
  title: string;
  isSmall?: boolean;
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
