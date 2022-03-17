import { styled } from "@stitches/react";
import commonStyles from "./commonStyles";

const Input = styled('input', {
  ...commonStyles,
  height: '36px',

  variants: {
    label: {
      false: {
        padding: '0 20px',          
      },

      true: {
        padding: '18px 12px',
      },
    },
  },

  defaultVariants: {
    label: 'false',
  },
});

export default Input;