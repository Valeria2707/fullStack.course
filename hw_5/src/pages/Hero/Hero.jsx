import React from "react";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import HeroDetailsSidebar from "../../components/HeroDetailsSidebar/HeroDetailsSidebar";
import { useTheme } from "../../context/ThemeContext";
import { StyledTypography } from "./HeroStyles";
import { fetchHeroById } from "../../api/hero";

export default function Hero() {
  const { id } = useParams();
  const { mode } = useTheme();

  const { data, error, loading } = useRequest(() => fetchHeroById(id), {
    refreshDeps: [id],
  });

  const isHero = data && id;

  if (error)
    return <StyledTypography mode={mode}>Error loading data</StyledTypography>;

  if (loading)
    return <StyledTypography mode={mode}>Loading...</StyledTypography>;

  return <>{isHero && <HeroDetailsSidebar hero={data} />}</>;
}
