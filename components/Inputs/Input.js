import { styled } from "@stitches/react";
import commonStyles from "./commonStyles";

const Input = styled('input', {
  height: '36px',
  outline: 'transparent',

  variants: {
    label: {
      false: {
        padding: '0 20px',          
      },

      true: {
        padding: '18px 12px',
      },
    },

    color: {
      white: {
        ...commonStyles,
      },

      grey: {
        border: 'none',
        borderRadius: '20px',
        padding: '0 20px',
        fontFamily: 'Raleway',
        fontSize: '14px',
        fontWeight: '400',
        color: '#A2A2A2',
        backgroundColor: '#F5F5F5',

        '&:focus': {
          outlineStyle: 'solid',
          outlineWidth: '1px',
          outlineColor: '#A2A2A2',
        },
      }
    },
  },

  defaultVariants: {
    label: 'false',
    color: 'white',
  },
});

export default Input;