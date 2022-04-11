import { styled } from "@stitches/react";
import commonStyles from "./commonStyles";

const Input = styled("input", {
  height: "36px",
  outline: "transparent",

  variants: {
    label: {
      false: {
        padding: "0 20px",
      },

      true: {
        padding: "18px 12px",
      },
    },

    color: {
      white: {
        ...commonStyles,
      },

      grey: {
        border: "none",
        borderRadius: "20px",
        padding: "0 20px",
        fontFamily: "Raleway",
        fontSize: "14px",
        fontWeight: "400",
        color: "$gray",
        backgroundColor: "$background",

        "&:focus": {
          outlineStyle: "solid",
          outlineWidth: "1px",
          outlineColor: "$gray",
        },
      },
    },
  },

  defaultVariants: {
    label: "false",
    color: "white",
  },
});

export default Input;
