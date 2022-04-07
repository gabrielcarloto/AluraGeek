import { createStitches } from "@stitches/react";

export const { styled, css, globalCss } = createStitches({
  theme: {
    colors: {
      primary: "#2A7AE4",
      primaryHover: "#5595E9",
      secondary: "#EAF2FD",
      secondaryHover: "#D4E4FA",
      background: "#F5F5F5",
      lightBackground: "$white",
      text: "$darkGray",
      lightText: "$gray",
      border: "$lightGray",
      info: "$primary",
      error: "$red",
      success: "$green",
      warning: "$yellow",

      white: "#FFFFFF",
      gray: "#A2A2A2",
      lightGray: "#C8C8C8",
      darkGray: "#464646",
      red: "#FF5252",
      redHover: "#FF4242",
      green: "#4CAF50",
      greenHover: "#3E8E41",
      yellow: "#FFA000",
      yellowHover: "#FFB100",
    },
  }
});