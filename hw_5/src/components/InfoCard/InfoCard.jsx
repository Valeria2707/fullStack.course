import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { StyledBox, StyledTitle, StyledText } from "./InfoCardStyles";

export default function InfoCard({ title, text }) {
  const { mode } = useTheme();
  return (
    <StyledBox>
      <StyledTitle variant="h4" mode={mode}>
        {title}
      </StyledTitle>
      <StyledText variant="body1" mode={mode}>
        {text}
      </StyledText>
    </StyledBox>
  );
}
