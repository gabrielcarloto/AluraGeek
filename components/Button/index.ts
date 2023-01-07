import { styled } from "@stitches/react";

const Button = styled("button", {
  height: "40px",
  fontFamily: "Raleway",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 200ms ease-in-out",

  "@media (min-width: 768px)": {
    height: "50px",
    fontSize: "16px",
    fontWeight: "400",
  },

  variants: {
    color: {
      primary: {
        backgroundColor: "$primary",
        color: "$white",
        border: "none",

        "&:hover": {
          backgroundColor: "$primaryHover",
        },
      },

      secondary: {
        backgroundColor: "transparent",
        color: "$primary",
        border: "1px solid $primary",

        "&:hover": {
          backgroundColor: "$secondaryHover",
        },
      },
    },
  },
});

export default Button;
