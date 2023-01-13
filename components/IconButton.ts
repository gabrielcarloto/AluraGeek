import { styled } from '@styles/theme';

const IconButton = styled('button', {
  aspectRatio: '1 / 1',
  width: '30px',
  margin: '0 5px',

  display: 'grid',
  placeItems: 'center',

  border: 'none',
  borderRadius: '50%',

  cursor: 'pointer',
  transition: 'all 50ms ease-in-out',

  variants: {
    color: {
      primary: {
        backgroundColor: '$secondary',
        color: '$primary',

        '&:hover': { backgroundColor: '$primary', color: '$white' },
      },

      red: {
        backgroundColor: 'rgba(255, 50, 50, 0.15)',
        color: '$red',

        '&:hover': { backgroundColor: '$red', color: '$white' },
      },
    },
  },

  defaultVariants: {
    color: 'primary',
  },
});

export default IconButton;
