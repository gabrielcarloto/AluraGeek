import { styled } from "@stitches/react";

const Spacer = styled('div', {
  height: '16px',
  width: '100%',

  '@media (min-width: 768px)': {
    height: '32px',
  },

  '@media (min-width: 1024px)': {
    height: '64px',
  },
});

export default Spacer;