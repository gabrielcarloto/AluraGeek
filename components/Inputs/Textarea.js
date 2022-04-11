import { styled } from "@stitches/react";
import commonStyles from "./commonStyles";

const Textarea = styled("textarea", {
  ...commonStyles,
  height: "82px",
  padding: "8px 12px",
  resize: "none",
});

export default Textarea;
