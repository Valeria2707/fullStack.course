import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import {
  StyledContainer,
  StyledTitle,
  StyledTableBox,
  StyledDataGrid,
} from "./HeroTableStyles";
import { COLUMNS_HERO } from "../../constants/hero.constants";

function HeroTable({ heroes }) {
  const navigate = useNavigate();
  const { mode } = useTheme();

  const handleRowClick = (params) => navigate(`/heroes/${params.id}`);

  const rows = heroes.map(({ id, name, status }) => ({ id, name, status }));

  return (
    <StyledContainer>
      <StyledTitle variant="h3" mode={mode}>
        Rick & Morty Heroes
      </StyledTitle>
      <StyledTableBox>
        <StyledDataGrid
          rows={rows}
          columns={COLUMNS_HERO}
          onRowClick={handleRowClick}
          disableColumnMenu
          hideFooter
          mode={mode}
        />
      </StyledTableBox>
    </StyledContainer>
  );
}

export default HeroTable;
