import { createStitches } from "@stitches/react";

export const { styled, css, globalCss } = createStitches({
  theme: {
    colors: {
      primary: "#2A7AE4",
      secondary: "#EAF2FD",
      background: "#F5F5F5",
      lightBackground: "$white",
      text: "$darkGray",
      lightText: "$gray",
      border: "$lightGray",
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
      yellow: "#FFC107",
      yellowHover: "#FFA000",
    },
  }
});