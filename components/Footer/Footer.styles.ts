import { css } from '@stitches/react';

export const FooterStyles = css({
  backgroundColor: '$secondary',

  '.footer-grid': {
    '@media (min-width: 1024px)': {
      rowGap: '0',
    },
  },

  '.footer-logo': {
    gridColumn: '1 / -1',
    margin: '0 auto',
    cursor: 'pointer',

    '@media (min-width: 768px)': {
      width: '176px',
      gridColumn: '1 / 5',
      margin: '0',
    },

    '@media (min-width: 1024px)': {
      gridColumn: '1 / 3',
    },
  },

  '.footer-links': {
    listStyleType: 'none',
    textAlign: 'center',
    marginBottom: '16px',
    gridColumn: '1 / -1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',

    '@media (min-width: 768px)': {
      textAlign: 'left',
      gridColumn: '1 / 5',
      alignItems: 'flex-start',
      gap: '24px',
    },

    '@media (min-width: 1024px)': {
      gridColumn: '4 / 7',
      marginBottom: '0',
    },

    li: {
      cursor: 'pointer',
    },
  },

  '.form-btn': {
    width: 'clamp(150px, 10vw, 165px)',
  },

  '.dev': {
    backgroundColor: '$lightBackground',
    fontSize: '16px',
    fontWeight: '500',
    textAlign: 'center',

    a: {
      display: 'inline-block',
    },
  },
});
