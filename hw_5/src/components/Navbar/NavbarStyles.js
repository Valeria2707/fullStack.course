import { styled } from "@mui/system";
import { Box, ListItem, ListItemText } from "@mui/material";

export const StyledBox = styled(Box)(({ mode }) => ({
  borderRight: "1px solid #ccc",
  backgroundColor: mode === "light" ? "#ffe0f0" : "#222222",
  padding: "16px",
  height: "100vh",
  boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  width: "200px",
  minWidth: "200px",
  maxWidth: "200px",
  overflow: "hidden",
}));

export const StyledListItem = styled(ListItem)(({ mode }) => ({
  borderRadius: "8px",
  marginBottom: "8px",
  "&:hover": {
    backgroundColor: mode === "light" ? "#ff80ab" : "#636363",
  },
  "&.active": {
    backgroundColor: mode === "light" ? "#ff4081" : "#555555",
  },
}));

export const StyledListItemText = styled(ListItemText)(({ mode }) => ({
  textAlign: "center",
  fontWeight: "bold",
  color: mode === "light" ? "black" : "white",
}));
