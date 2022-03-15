import { styled } from "@stitches/react";

const Container = styled('div', {
  height: '100%',
  width: '100%',

  '@media (min-width: 768px) and (orientation: portrait)': {
    padding: '0px 35px',
  },

  '@media (min-width: 768px) and (orientation: landscape)': {
    padding: '0px 152px',
  },

  '@media (max-width: 768px)': {
    padding: '0px 19px',
  },
});

export default Container;