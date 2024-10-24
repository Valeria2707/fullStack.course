import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { StyledSwitch } from "./ThemeSwitcherStyles";

function ThemeSwitcher() {
  const { isDarkMode, toggleTheme } = useTheme();

  return <StyledSwitch checked={isDarkMode} onChange={toggleTheme} />;
}

export default ThemeSwitcher;
