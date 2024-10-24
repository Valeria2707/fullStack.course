import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import {
  StyledContainer,
  StyledImage,
  StyledTitle,
  StyledText,
  StyledButton,
} from "./HeroDetailsSidebarStyles";

function HeroDetailsSidebar({ hero }) {
  const { mode } = useTheme();
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  return (
    <StyledContainer>
      <StyledImage
        component="img"
        src={hero.image}
        alt={hero.name}
        mode={mode}
      />
      <StyledTitle variant="h6">{hero.name}</StyledTitle>
      <StyledText variant="body1">Status: {hero.status}</StyledText>
      <StyledButton onClick={handleBack} variant="contained" mode={mode}>
        Back
      </StyledButton>
    </StyledContainer>
  );
}

export default HeroDetailsSidebar;
