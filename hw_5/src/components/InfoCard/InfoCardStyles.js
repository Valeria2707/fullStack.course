import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";

export const StyledBox = styled(Box)({
  padding: "16px",
});

export const StyledTitle = styled(Typography)(({ mode }) => ({
  color: mode === "light" ? "black" : "white",
  textAlign: "center",
}));

export const StyledText = styled(Typography)(({ mode }) => ({
  color: mode === "light" ? "black" : "white",
  textAlign: "center",
  marginTop: "16px",
}));
