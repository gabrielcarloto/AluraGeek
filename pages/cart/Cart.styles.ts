import type { Variants } from 'framer-motion';

import { css, styled } from '@styles/theme';

const CartStyles = (cartItemsLength: number, animationEnded: boolean) =>
  css({
    width: '100%',
    minHeight: '50vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',

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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',

      '@media (min-width: 768px)': {
        gap: '32px',
      },

      '@media (min-width: 1024px)': {
        height: 'auto',
        flexDirection: 'row',
      },

      '.cart-products': {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',

        '@media (min-width: 1024px)': {
          alignSelf: 'flex-start',
        },

        '.products': {
          height: cartItemsLength * 160 + (cartItemsLength - 1) * 8,
          transition: animationEnded ? 'height 300ms ease-in-out' : 'none',
          transitionDelay: '300ms',
        },

        '.cart-product': {
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          padding: '5px',
          marginBottom: '8px',
          backgroundColor: '$white',

          '&:last-of-type': {
            marginBottom: 0,
          },
        },

        '.cart-total-items': {
          fontSize: '16px',
          fontWeight: '400',
          marginTop: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      },

      '.cart-checkout': {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',

        '@media (min-width: 1024px)': {
          width: '60%',
          alignSelf: 'flex-start',
          gap: '16px',
          position: 'sticky',
          top: '32px',
        },

        '@media (min-width: 1440px)': {
          width: '50%',
        },

        '.cart-checkout-total': {
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',

          '@media (min-width: 1024px)': {
            gap: '8px',
          },

          '.shipping, .discount, .estimated': {
            flexDirection: 'row',
            justifyContent: 'space-between',
          },

          '.cart-checkout-total--text': {
            fontSize: '16px',
            fontWeight: '500',

            '&.estimated': {
              fontSize: '18px',
              fontWeight: '700',
            },
          },
        },
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

export const PromoForm = styled('form', {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',

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

export default CartStyles;
