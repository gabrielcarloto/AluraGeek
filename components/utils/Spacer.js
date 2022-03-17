import { styled } from "@stitches/react";

const Spacer = styled('div', {
  width: '100%',

  variants: {
    defaultProps: {
      y: 2,
    },
    
    responsive: {
      1: {
        height: '16px',

        '@media (min-width: 768px)': {
          height: '32px',
        },

        '@media (min-width: 1024px)': {
          height: '64px',
        },
      },

      2: {
        height: '32px',

        '@media (min-width: 768px)': {
          height: '64px',
        },
      },

      3: {
        height: '16px',

        '@media (min-width: 768px)': {
          height: '24px',
        },
      },
    },

    y: {
      8: {
        height: '8px',
      },

      16: {
        height: '16px',
      },

      32: {
        height: '32px',
      }
    },
  },
});

export default Spacer;