import { styled } from "@stitches/react";

const Grid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gridTemplateRows: 'max-content',
  gridGap: '16px',
});

export default Grid;