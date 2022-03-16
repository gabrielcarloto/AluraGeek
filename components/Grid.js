import { styled } from "@stitches/react";

const Grid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '16px',

  '@media (min-width: 768px)': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },

  '@media (min-width: 1024px)': {
    gridTemplateColumns: 'repeat(6, 1fr)',
  },
});

export default Grid;