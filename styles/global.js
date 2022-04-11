import { globalCss } from "./theme";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/500.css";
import "@fontsource/raleway/600.css";
import "@fontsource/raleway/700.css";

const globalStyles = globalCss({
  "*": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    maxWidth: "100%",
  },

  body: {
    position: "relative",
    fontFamily: "Raleway",
    fontWeight: "400",
    color: "$text",
  },

  "html, body": {
    height: "100vh",
    width: "100vw",
    backgroundColor: "$background",
    overflowX: "clip",
  },

  a: {
    textDecoration: "none",
    color: "$text",
    position: "relative",
    cursor: "pointer",
    transition: "color 200ms ease-in-out",

    "&:visited": {
      color: "inherit",
    },

    "@media (hover: hover) and (pointer: fine)": {
      "&:hover": {
        color: "$primary",
      },

      "&::after": {
        content: '""',
        display: "block",
        position: "absolute",
        width: "0%",
        height: "2.5px",
        backgroundColor: "$primary",
        transition: "all 200ms ease-in-out",
      },

      "&:hover::after": {
        width: "100%",
      },
    },
  },

  ".scr-only": {
    position: "absolute",
    height: "1px",
    width: "1px",
    clip: "rect(1px 1px 1px 1px)",
    clipPath: "polygon(0px 0px, 0px 0px, 0px 0px)",
    "-webkit-clip-path": "polygon(0px 0px, 0px 0px, 0px 0px)",
    overflow: "hidden !important",
  },

  "#nprogress": {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    zIndex: "9999",
    pointerEvents: "none",
  },

  "#nprogress .bar": {
    background: "$primary",
    height: "3px",
  },
});

export default globalStyles;
