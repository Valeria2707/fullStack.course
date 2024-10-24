import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const StyledAppContainer = styled(Box)(({ mode }) => ({
  display: "flex",
  width: "100%",
  minHeight: "100vh",
  backgroundColor: mode === "light" ? "#ffe0f0" : "black",
}));

export const StyledAppContent = styled(Box)({
  flexGrow: 1,
  padding: 2,
});
