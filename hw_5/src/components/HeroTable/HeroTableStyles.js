import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

export const StyledTitle = styled(Typography)(({ mode }) => ({
  color: mode === "light" ? "black" : "white",
}));

export const StyledTableBox = styled(Box)({
  height: "400px",
  width: "100%",
  backgroundColor: "background.paper",
  boxShadow: 3,
  borderRadius: "8px",
  borderColor: "white",
  overflow: "hidden",
  padding: "16px",
});

export const StyledDataGrid = styled(DataGrid)(({ mode }) => ({
  "& .MuiDataGrid-row": { backgroundColor: "white" },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: mode === "light" ? "pink" : "#636363",
  },
  "& .MuiDataGrid-row.Mui-selected": {
    backgroundColor: mode === "light" ? "pink !important" : "#636363",
    borderColor: mode === "light" ? "pink " : "#636363",
    ":hover": {
      backgroundColor: mode === "light" ? "pink" : "#636363",
    },
  },
  "& .MuiDataGrid-cell": {
    fontSize: "16px",
  },
  "& .MuiDataGrid-columnHeaders": {
    fontSize: "18px",
    fontWeight: "bold",
  },
  "& .MuiDataGrid-cell:focus": {
    outline: "none",
  },
}));
