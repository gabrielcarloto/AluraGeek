import { keyframes, styled } from '@styles/theme';

const inAnimation = keyframes({
  '0%': {
    width: 0,
  },
  '100%': {
    width: '100%',
  },
});

const Divider = styled('hr', {
  $$duration: '200ms',

  height: 0,
  width: '100%',
  borderTop: '1px solid $border',
  marginTop: 8,
  marginBottom: 8,

  variants: {
    animate: {
      true: {
        width: 0,

        animation: `${inAnimation} $$duration ease-in-out forwards`,
        animationDelay: '$$delay',
      },
    },
  },
});

export default Divider;
