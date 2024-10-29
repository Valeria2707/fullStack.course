import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import HeroTable from "../../components/HeroTable/HeroTable";
import useApi from "../../hooks/useApi";
import { useTheme } from "../../context/ThemeContext";
import { StyledBox, StyledTypography } from "./HeroesStyles";

function Heroes() {
  const { mode } = useTheme();
  const [heroes, setHeroes] = useState([]);
  const isHeroes = heroes.length > 0;

  const {
    data: dataHeroes,
    error: errorHeroes,
    loading: loadingHeroes,
  } = useApi("https://rickandmortyapi.com/api/character?page=1");

  useEffect(() => {
    if (dataHeroes?.results) {
      setHeroes(dataHeroes.results);
    }
  }, [dataHeroes]);

  if (errorHeroes)
    return <StyledTypography mode={mode}>Error loading data</StyledTypography>;

  if (loadingHeroes)
    return <StyledTypography mode={mode}>Loading...</StyledTypography>;

  return (
    <StyledBox>
      {isHeroes ? (
        <HeroTable heroes={heroes} />
      ) : (
        <StyledTypography mode={mode}>
          Sorry, there are no heroes
        </StyledTypography>
      )}
      <Outlet />
    </StyledBox>
  );
}

export default Heroes;
