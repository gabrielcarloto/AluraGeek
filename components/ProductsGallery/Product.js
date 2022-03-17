import { styled } from "@stitches/react";

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

export default Product;