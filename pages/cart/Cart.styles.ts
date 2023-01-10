import type { Variants } from 'framer-motion';

import { css } from '@styles/theme';

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

      '.divider': {
        height: '0',
        border: '1px solid $border',
      },

      '.cart-products': {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',

        '@media (min-width: 1024px)': {
          alignSelf: 'flex-start',
        },

        '.products': {
          height: cartItemsLength * 168.5 + 'px',
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

          '.cart-product-image': {
            width: '30vw',
            height: '150px',
            position: 'relative',
            cursor: 'pointer',

            '@media (min-width: 1024px)': {
              width: '15vw',
            },

            '@media (min-width: 1440px)': {
              width: '10vw',
            },
          },

          '.cart-product-details': {
            padding: '16px 0',
            flex: '1',
            gap: '8px',

            '@media (min-width: 1024px)': {
              padding: '16px 8px',
            },

            '.cart-product-name': {
              fontSize: '16px',
              fontWeight: '600',
              gridColumn: '1 / -1',
              gridRow: '1',

              '@media (min-width: 1024px)': {
                fontSize: '18px',
              },
            },

            '.cart-product-price': {
              fontWeight: '400',
              gridColumn: '1 / -1',
              gridRow: '2',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',

              '@media (min-width: 1024px)': {
                justifyContent: 'flex-start',
                flexDirection: 'row',
                gap: '16px',
              },

              span: {
                fontSize: '16px',
                display: 'flex',
                gap: '4px',
              },

              strong: {
                fontWeight: '700',
              },
            },

            '.cart-product-quantity': {
              fontSize: '16px',
              fontWeight: '700',
              gridColumn: '1 / -1',
              gridRow: '3',
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'flex-end',
              justifySelf: 'flex-end',

              '.cart-product-quantity-button': {
                width: '30px',
                height: '30px',
                margin: '0 5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                borderRadius: '50%',
                backgroundColor: '$secondary',
                color: '$primary',
                cursor: 'pointer',
                transition: 'all 100ms ease-in-out',

                '&.remove': {
                  backgroundColor: 'rgba(255, 50, 50, 0.15)',
                  color: '$red',
                },

                '@media (hover: hover) and (pointer: fine)': {
                  '&:hover': {
                    backgroundColor: '$primary',
                    color: '$white',

                    '&.remove': {
                      backgroundColor: '$red',
                      color: '$white',
                    },
                  },
                },
              },
            },
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

        '.cart-checkout-promo': {
          width: '100%',
          display: 'flex',
          flexDirection: 'column',

          '.cart-checkout-promo-form': {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',

            '.cart-checkout-promo-input': {
              width: '100%',
              height: '40px',
              borderRadius: '0',

              '@media (min-width: 768px)': {
                height: '50px',
              },
            },

            '.cart-checkout-promo-btn': {
              width: '30%',
            },
          },
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

export default CartStyles;
