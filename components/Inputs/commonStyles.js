const commonStyles = {
  width: '100%',
  border: 'none',
  borderBottom: '1px solid $border',
  borderRadius: '4px',
  color: '$text',
  fontFamily: 'Raleway',
  fontSize: '16px',
  fontWeight: '400',
  transition: 'outline 200ms ease-in-out',

  '&:user-invalid': {
    outline: '1px solid $error',
    borderBottom: '0',
  },

  '&:focus': {
    outlineColor: '$border',
    outlineStyle: 'solid',
    outlineWidth: '1px',
  },
};

export default commonStyles;