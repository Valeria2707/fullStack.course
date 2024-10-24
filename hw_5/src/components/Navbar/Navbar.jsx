import React from "react";
import { Link } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { useTheme } from "../../context/ThemeContext";
import { StyledBox, StyledListItem, StyledListItemText } from "./NavbarStyles";
import { getPath } from "../../helpers/path";
import { MENU_OPTIONS } from "../../constants/menu.constants";

function Navbar() {
  const { mode } = useTheme();

  return (
    <StyledBox mode={mode}>
      <ThemeSwitcher />
      <nav>
        {MENU_OPTIONS.map((text) => (
          <StyledListItem
            key={text}
            component={Link}
            to={getPath(text)}
            mode={mode}
          >
            <StyledListItemText primary={text} mode={mode} />
          </StyledListItem>
        ))}
      </nav>
    </StyledBox>
  );
}

export default Navbar;
