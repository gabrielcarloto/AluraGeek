import Link from "next/link";
import Image from "next/image";
import { css } from "@stitches/react";

function Product({ product }) {
  const Product = css({
    cursor: 'pointer',
    gridColumn: 'span 6',
    padding: '10px',
    backgroundColor: '#FFFFFF',
    transition: 'all 200ms cubic-bezier(0.29, 0.59, 0.43, 1.01)',
  
    '@media (hover: hover) and (pointer: fine)': {
      '&:hover': {
        padding: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        transform: 'translate(10px, 20px) scale(1.2)',
        zIndex: '1',

        '.product-image-container': {
          height: '164px',

          '@media (min-width: 1440px)': {
            height: '210px',
          },
        },

        '.product-link::after': {
          width: '100%',
          top: '18px',
        },
      },
    },
  
    '@media (min-width: 768px)': {
      gridColumn: 'span 3',
    },
    
    '@media (min-width: 1024px)': {
      padding: '16px',
    },

    '@media (min-width: 1440px)': {
      gridColumn: 'span 2',
    },
  
    '.product-image-container': {
      height: '174px',
      transition: 'all 200ms cubic-bezier(0.29, 0.59, 0.43, 1.01)',

      '@media (min-width: 1440px)': {
        height: '220px',
      },

      '.product-image': {
        height: '100%',
        width: '100%',
        position: 'relative',
      },
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
    <Link passHref href="/products/[id]" as={`/products/${product.id}`} key={product.id}>
      <div className={Product()}>
        <div className="product-image-container">
          <div className="product-image">
            <Image 
              src={product.image}
              alt={product.alt}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">{parseInt(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          <a className="product-link">Ver produto</a>
        </div>
      </div>
    </Link>
  );
};

export default Product;