import Button from '@components/Button';
import Container from '@components/utils/Container';
import { css, styled } from '@styles/theme';

export const AdminPageContainer = styled(Container, {
  '@media (min-width: 1024px)': {
    padding: '0 30%',
  },
});

export const NewProductForm = styled('form', {
  marginTop: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const FileInputContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const NewProductFile = styled('div', {
  width: '100%',
  height: '140px',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '20px',
  backgroundColor: '$lightBackground',
  border: '1px dashed $border',

  '@media (min-width: 768px)': {
    height: '154px',
  },
});

export const NewProductIcon = css({
  width: '35px',
  height: '35px',
  color: '$lightText',

  '@media (min-width: 768px)': {
    width: '44px',
    height: '44px',
  },
});

export const FileInput = styled('input', {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0px',
  left: '0px',
  opacity: 0,
  cursor: 'pointer',
});

export const FileInputButton = styled(Button, {
  position: 'relative',
  width: '50%',
});

export const FileInputLabel = styled('label', {
  width: '100%',
  textAlign: 'center',
  fontWeight: '400',
  color: '#6B6B6B',
});
