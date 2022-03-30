import { styled } from '../../styles/theme';

const Dialog = styled('div', {
  width: '90%',
  position: 'fixed',
  bottom: '2%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  zIndex: '2',
  color: '$white',

  '@media (min-width: 1024px)': {
    width: '30%',
  },

  '.dialog-header-content': {
    padding: '3%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '20px',

    '@media (min-width: 768px)': {
      fontSize: '22px',
    },

    '.dialog-header-title': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',

      'p': {
        fontWeight: '700',
      },
    },

    '.dialog-header-buttons': {
      display: 'flex',
      gap: '8px',

      '.close': {
        cursor: 'pointer',
      },
    },
  },

  '.dialog-content': {
    fontSize: '16px',

    '@media (min-width: 768px)': {
      fontSize: '18px',
    },

    'p': {
      padding: '0 3% 4%',
      textAlign: 'center',
    },
  },

  variants: {
    color: {
      error: {
        backgroundColor: '$error',
      },

      success: {
        backgroundColor: '$success',
      },

      warning: {
        backgroundColor: '$warning',
      }, 

      info: {
        backgroundColor: '$info',
      },
    },
  },
});

export default Dialog;