import { globalCss } from "@stitches/react";
import "@fontsource/raleway";

const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },

  'body': {
    fontFamily: 'Raleway, sans-serif',
  },

  'html, body': {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#F5F5F5',
    overflowX: 'hidden',
  },

  'a': {
    textDecoration: 'none',
  }
});

export default globalStyles;