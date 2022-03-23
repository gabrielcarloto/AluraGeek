import { globalCss } from "@stitches/react";
import "@fontsource/raleway/variable.css"

const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    maxWidth: '100%',
  },

  'body': {
    position: 'relative',
    fontFamily: 'Raleway',
    fontWeight: '400',
    color: '#464646',
  },

  'html, body': {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#F5F5F5',
    overflowX: 'hidden',
  },

  'a': {
    textDecoration: 'none',
    display: 'inline-block',
    position: 'relative',
    transition: 'color 200ms ease-in-out',
    
    '&:visited': {
      color: 'inherit',
    },
    
    '@media (hover: hover) and (pointer: fine)': {
      '&:hover': {
        color: '#2A7AE4',
      },
      
      '&::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        width: '0%',
        height: '2.5px',
        backgroundColor: '#2A7AE4',
        transition: 'all 200ms ease-in-out',
      },
  
      '&:hover::after': {
        width: '100%',
      },
    },
  },

  '.scr-only': {
    position: 'absolute',
    height: '1px',
    width: '1px',
    clip: 'rect(1px 1px 1px 1px)',
    clipPath: 'polygon(0px 0px, 0px 0px, 0px 0px)',
    '-webkit-clip-path': 'polygon(0px 0px, 0px 0px, 0px 0px)',
    overflow: 'hidden !important',
  }
});

export default globalStyles;