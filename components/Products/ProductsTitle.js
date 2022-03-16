import Link from 'next/link';
import Image from 'next/image';
import { styled } from "@stitches/react";

function ProductsTitle({ title }) {
  const ProductsTitle = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    'h2': {
      fontSize: '22px',
      fontWeight: '700',
      lineHeight: '26px',
      color: '#464646',

      '@media (min-width: 1024px)': {
        fontSize: '32px',
        lineHeight: '36px',
      },
    },

    '.products-link': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',

      'p': {
        fontSize: '14px',
        fontWeight: '700',
        lineHeight: '16px',
        color: '#2A7AE4',

        '@media (min-width: 768px)': {
          fontSize: '16px',
          lineHeight: '18px',
        },
      },

      '.products-arrow': {
        width: '10px',
        height: '10px',
        marginLeft: '7px',

        '@media (min-width: 768px)': {
          width: '16px',
          height: '16px',
          marginLeft: '12px',
        },
      }
    },
  });

  return (
    <ProductsTitle>
      <h2>{title}</h2>
      <Link passHref href="/products">
        <div className="products-link">
          <p>Ver tudo</p>
          <div className="products-arrow">
            <Image src="/arrow.svg" width="20px" height="20px" layout="responsive" alt="seta" />
          </div>
        </div>
      </Link>
    </ProductsTitle>
  );
}

export default ProductsTitle;