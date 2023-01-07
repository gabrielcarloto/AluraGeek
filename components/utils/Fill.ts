import { styled } from "../../styles/theme";

const Fill = styled("div", {
  width: "100%",
  height: "50vh",

  "@media (min-width: 768px)": {
    height: "calc(100vh - 483px - 115px)",
  },

  "@media (min-width: 1024px)": {
    height: "60vh",
  },

  "@media (min-width: 1440px)": {
    height: "calc(100vh - 464px - 115px)",
  },

  variants: {
    display: {
      flex: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },

    flexDirection: {
      column: {
        flexDirection: "column",
      },
      row: {
        flexDirection: "row",
      },
    },
  },
});

export default Fill;
