import { styled } from '@styles/theme';

const Title = styled('h1', {
  fontSize: '22px',
  fontWeight: '700',
  lineHeight: '26px',

  '@media (min-width: 1024px)': {
    fontSize: '32px',
    lineHeight: '36px',
  },
});

export default Title;
