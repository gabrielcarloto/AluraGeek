import { styled } from "@stitches/react";

const Spacer = styled('div', {
  width: '100%',

  variants: {
    y: {
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
    },
  },
});

export default Spacer;