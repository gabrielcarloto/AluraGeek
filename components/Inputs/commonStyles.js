const commonStyles = {
  width: '100%',
  border: 'none',
  borderBottom: '1px solid #C8C8C8',
  borderRadius: '4px',
  color: '#464646',
  fontFamily: 'Raleway',
  fontSize: '16px',
  fontWeight: '400',
  transition: 'outline 200ms ease-in-out',

  '&:user-invalid': {
    border: '1px solid $error',
  },

  '&:focus': {
    outlineColor: '#C8C8C8',
    outlineStyle: 'solid',
    outlineWidth: '1px',
  },
};

export default commonStyles;