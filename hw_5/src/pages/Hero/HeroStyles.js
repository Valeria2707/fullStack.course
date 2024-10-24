import { styled } from "@mui/system";
import { Typography } from "@mui/material";

export const StyledTypography = styled(Typography)(({ mode }) => ({
  color: mode === "light" ? "black" : "white",
}));
