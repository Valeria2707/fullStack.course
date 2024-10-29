import { styled } from "@mui/system";
import { Box, Typography, Button } from "@mui/material";

export const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  padding: "40px",
  borderRadius: "12px",
  backgroundColor: "white",
  boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
  margin: "16px auto 0",
});

export const StyledImage = styled(Box)(({ mode }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  marginBottom: "8px",
  objectFit: "cover",
  border: `2px solid ${mode === "light" ? "#ff4081" : "#636363"}`,
}));

export const StyledTitle = styled(Typography)({
  fontWeight: "bold",
  fontSize: "18px",
  color: "black",
});

export const StyledText = styled(Typography)({
  fontSize: "14px",
  color: "black",
});

export const StyledButton = styled(Button)(({ mode }) => ({
  marginTop: "8px",
  padding: "4px 24px",
  fontSize: "14px",
  backgroundColor: mode === "light" ? "#ff4081" : "#636363",
  color: "black",
  "&:hover": {
    backgroundColor: mode === "light" ? "#e91e63" : "#636363",
  },
}));
