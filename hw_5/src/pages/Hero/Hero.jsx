import React from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import HeroDetailsSidebar from "../../components/HeroDetailsSidebar/HeroDetailsSidebar";
import Page404 from "../Page404/Page404";
import { useTheme } from "../../context/ThemeContext";
import { StyledTypography } from "./HeroStyles";

export default function Hero() {
  const { id } = useParams();
  const { mode } = useTheme();

  const {
    data: dataHero,
    error: errorHero,
    loading: loadingHero,
  } = useApi(`https://rickandmortyapi.com/api/character/${id}`);

  const isHero = dataHero && id && !dataHero.error;

  if (errorHero)
    return <StyledTypography mode={mode}>Error loading data</StyledTypography>;

  if (loadingHero)
    return <StyledTypography mode={mode}>Loading...</StyledTypography>;

  return <>{isHero ? <HeroDetailsSidebar hero={dataHero} /> : <Page404 />}</>;
}
