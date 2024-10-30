import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import HeroTable from "../../components/HeroTable/HeroTable";
import { useRequest } from "ahooks";
import { useTheme } from "../../context/ThemeContext";
import { StyledBox, StyledTypography } from "./HeroesStyles";
import { fetchHeroes } from "../../api/heros";

function Heroes() {
  const { mode } = useTheme();
  const [heroes, setHeroes] = useState([]);
  const isHeroes = heroes.length > 0;

  const { data, error, loading } = useRequest(() => fetchHeroes(1), {
    retryCount: 3,
  });

  useEffect(() => {
    if (data?.results) {
      setHeroes(data.results);
    }
  }, [data]);

  if (error)
    return <StyledTypography mode={mode}>Error loading data</StyledTypography>;

  if (loading)
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
