import { styled } from "@stitches/react";

const Product = styled('div', {
  cursor: 'pointer',
  gridColumn: 'span 6',
  transition: 'all 200ms cubic-bezier(0.29, 0.59, 0.43, 1.01)',

  '@media (hover: hover) and (pointer: fine)': {
    '&:hover': {
      padding: '20px',
      backgroundColor: '#FFFFFF',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      transform: 'translate(10px, 20px) scale(1.2)',
      zIndex: '1',
    },
  },


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