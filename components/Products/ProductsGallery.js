import Link from 'next/link';
import Image from 'next/image';
import { styled } from "@stitches/react";
import Container from "../Container";
import ProductsTitle from './ProductsTitle';
import Grid from '../Grid';

function ProductsGallery({ title, products }) {
  const Product = styled('div', {
    cursor: 'pointer',
    gridColumn: 'span 6',

    '@media (min-width: 768px)': {
      gridColumn: 'span 3',
    },

    '@media (min-width: 1024px)': {
      gridColumn: 'span 2',
    },

    '.product-image': {
      width: '100%',
    },

    '.product-details': {
      marginTop: '8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '8px',

      '.product-name': {
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '16px',
        color: '#464646',
        margin: '0',

        '@media (min-width: 768px)': {
          fontSize: '16px',
        },
      },

      '.product-price': {
        fontSize: '16px',
        fontWeight: '700',
        lineHeight: '18px',
        color: '#464646',
        margin: '0',
      },

      '.product-link': {
        fontSize: '14px',
        fontWeight: '700',
        lineHeight: '16px',
        color: '#2A7AE4',
        margin: '0',

        '@media (min-width: 768px)': {
          fontSize: '16px',
        },
      },
    },
  });

  return (
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
  );
};

export default ProductsGallery;