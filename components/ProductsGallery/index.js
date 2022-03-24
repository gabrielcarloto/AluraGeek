import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { css, styled } from '@stitches/react';
import Container from "../utils/Container";
import ProductsTitle from './ProductsTitle';
import Product from '../Product/index';
import Grid from '../utils/Grid';
import ProductSkeleton from '../Product/ProductSkeleton';

function ProductsGallery({ title, isSmall, products }) {
  return (
    <section>
      <Container>
        <ProductsTitle title={title} />
        <Grid>
          { products.length > 0 
            ? products.map(product => <Product product={product} key={product.id} />)
            : <ProductSkeleton length={isSmall ? 4 : 6} />
          }
        </Grid>
      </Container>
    </section>
  );
};

export default ProductsGallery;