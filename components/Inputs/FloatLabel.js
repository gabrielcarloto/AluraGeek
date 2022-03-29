import { css } from "@stitches/react";

const FloatLabel = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',

  '.label-background': {
    height: '0',
    width: '100%',
    borderRadius: '4px 4px 0 0',
    backgroundColor: '#FFFFFF',
    transition: 'all 200ms ease-in-out',
    zIndex: '1',
    
    '&.active': {
      marginBottom: '-4px',
      height: '20px',
    },
  },

  '.focus': {
    boxShadow: '-0.7px -0.7px 0px #C8C8C8, 0.7px -0.7px 0px #C8C8C8',
  },
  
  'label': {
    color: '#A2A2A2',
    position: 'absolute',
    userSelect: 'none',
    cursor: 'text',
    zIndex: '1',
    transition: 'all 200ms ease-in-out',
  },
});

export default FloatLabel;