import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { StyledBox, StyledTypography } from "./Page404Styles";

export default function Page404() {
  const { mode } = useTheme();
  return (
    <StyledBox>
      <StyledTypography variant="h4" mode={mode}>
        Ooops, this page isn't found
      </StyledTypography>
    </StyledBox>
  );
}
