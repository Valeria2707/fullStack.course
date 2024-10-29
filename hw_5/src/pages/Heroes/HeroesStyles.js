import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";

export const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "5px",
  alignItems: "center",
  width: "80%",
});

export const StyledTypography = styled(Typography)(({ mode }) => ({
  color: mode === "light" ? "black" : "white",
}));
