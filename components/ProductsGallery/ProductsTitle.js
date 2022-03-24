import Link from 'next/link';
import Image from 'next/image';
import { css } from "@stitches/react";

function ProductsTitle({ title, all }) {
  const ProductsTitle = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',

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

      'a': {
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
    <div className={ProductsTitle()}>
      <h2>{title}</h2>
      {
        all &&
        <Link passHref href="/products">
          <div className="products-link">
            <a>Ver tudo</a>
            <div className="products-arrow">
              <Image src="/arrow.svg" width="20px" height="20px" layout="responsive" alt="seta" />
            </div>
          </div>
        </Link>
      }
    </div>
  );
}

export default ProductsTitle;