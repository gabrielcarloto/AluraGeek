import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { css } from '@stitches/react';
import Container from "../utils/Container";
import ProductsTitle from './ProductsTitle';
import Product from '../Product/index';
import Grid from '../utils/Grid';
import Skeleton from '../utils/Skeleton';

function ProductsGallery({ title, isSmall, products }) {
  const SkeletonWrapper = css({
    gridColumn: 'span 6',
    padding: '10px',
    height: '250px',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    '@media (min-width: 768px)': {
      gridColumn: 'span 3',
    },

    '@media (min-width: 1024px)': {
      height: '300px',
      padding: '16px',
    },

    '@media (min-width: 1440px)': {
      gridColumn: 'span 2',
    },

    '.product-image-container': {
      height: '174px',

      '@media (min-width: 1440px)': {
        height: '220px',
      },
    },
  });

  return (
    <section>
      <Container>
        <ProductsTitle title={title} />
        <Grid>
          { products.length > 0 ? products.map(product => <Product product={product} key={product.id} />)
          : (
            Array(isSmall ? 4 : 6).fill(0).map((_, index) => {
              return (
                <div className={SkeletonWrapper()} key={index}>
                  <div className="product-image-container">
                    <Skeleton css={{ width: '100%', height: '100%' }} />
                  </div>
                  <Skeleton css={{ width: '90%' }} />
                  <Skeleton css={{ width: '40%' }} />
                  <Skeleton css={{ width: '50%' }} />
                </div>
              );
            })
          )}
        </Grid>
      </Container>
    </section>
  );
};

export default ProductsGallery;