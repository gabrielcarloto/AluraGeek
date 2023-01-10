import { styled } from '@styles/theme';

const Input = styled('input', {
  height: '36px',
  outline: 'transparent',
  border: 'none',
  borderRadius: '20px',
  padding: '0 20px',
  fontFamily: 'Raleway',
  fontSize: '14px',
  fontWeight: '400',
  color: '$gray',
  backgroundColor: '$background',

  '&:focus': {
    outlineStyle: 'solid',
    outlineWidth: '1px',
    outlineColor: '$gray',
  },
});

export default Input;
