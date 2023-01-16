import type { Variants } from 'framer-motion';

import { css, styled } from '@styles/theme';

const CartStyles = css({
  width: '100%',
  minHeight: '50vh',
  display: 'grid',

  '@media (min-width: 768px)': {
    '.cart-container': {
      display: 'flex',
      flexDirection: 'row',
    },
  },

  '.cart-fill': {
    height: '50vh',

    '@media (min-width: 1024px)': {
      height: '65vh',
    },

    '@media (min-width: 1440px)': {
      height: '58vh',
    },
  },

  '.cart-title': {
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '10px',

    h1: {
      fontSize: '22px',
    },

    svg: {
      fontSize: '22px',
    },

    '@media (min-width: 1024px)': {
      gap: '15px',

      h1: {
        fontSize: '32px',
      },

      svg: {
        fontSize: '32px',
      },
    },
  },

  '.cart-container': {
    minHeight: '40vh',
    display: 'grid',
    rowGap: '16px',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '2fr',

    '@media (min-width: 768px)': {
      gap: '32px',
      gridTemplateColumns: 'repeat(5, 1fr)',
    },

    '@media (min-width: 1024px)': {
      height: 'auto',
      flexDirection: 'row',
    },
  },
});

export const mainElAnimationProps: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export const Checkout = styled('section', {
  width: '100%',
  height: 'max-content',

  display: 'grid',
  gap: '8px',
  gridColumn: 'span 2',

  '@media (min-width: 1024px)': {
    alignSelf: 'flex-start',
    gap: '16px',
    position: 'sticky',
    top: '32px',
  },
});

export const PromoForm = styled('form', {
  width: '100%',
  display: 'flex',

  '& input': {
    width: '100%',
    height: '40px',
    borderRadius: '0',
    background: 'white',
    fontSize: 14,

    '@media (min-width: 768px)': {
      height: '50px',
    },
  },

  '& button': {
    width: '30%',
  },
});

export const Products = styled('div', {
  gridColumn: 'span 3',

  '@media (min-width: 1024px)': {
    alignSelf: 'flex-start',
  },

  '& > div:first-of-type': {
    transition: 'height 300ms ease-in-out',
    transitionDelay: '300ms',

    display: 'grid',
    gap: 8,
  },
});

export default CartStyles;
