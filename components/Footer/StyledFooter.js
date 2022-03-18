import { styled } from "@stitches/react";
import { formStyles } from "./Form";

const StyledFooter = styled('footer', {
  ...formStyles,
  backgroundColor: '#EAF2FD',

  'footer-grid': {
    '@media (min-width: 1024px)': {
      rowGap: '0',
    },
  },

  '.footer-logo': {
    gridColumn: '1 / -1',
    margin: '0 auto',
    cursor: 'pointer',

    '@media (min-width: 768px)': {
      gridColumn: '1 / 3',
      margin: '0',
    },
  },

  '.footer-links': {
    listStyleType: 'none',
    textAlign: 'center',
    marginBottom: '16px',
    gridColumn: '1 / -1',

    '@media (min-width: 768px)': {
      textAlign: 'left',
      gridColumn: '1 / 5',
    },

    '@media (min-width: 1024px)': {
      gridColumn: '4 / 6',
      marginBottom: '0',
    },

    'li': {
      cursor: 'pointer',
    },
  },

  '.form-btn': {
    width: 'clamp(150px, 10vw, 165px)',
  },

  '.dev': {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '16px',
    fontWeight: '500',
    color: '#464646',
    textAlign: 'center',
  }
});

export default StyledFooter;