import { createStitches } from "@stitches/react";

export const { styled, css, globalCss } = createStitches({
  theme: {
    colors: {
      primary: "#2A7AE4",
      secondary: "#EAF2FD",
      background: "#F5F5F5",
      lightBackground: "#FFFFFF",
      text: "#464646",
      lightText: "#A2A2A2",
      icon: "#A2A2A2",
      lightIcon: "#C8C8C8",
      border: "#C8C8C8",
      error: "#FF5252",
      success: "#4CAF50",
      warning: "#FFC107",
      white: "#FFFFFF",
    },
  }
});