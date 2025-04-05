import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue
    },
    secondary: {
      main: "#d32f2f", // Red
    },
    background: {
      default: "#f4f4f4",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default theme;
