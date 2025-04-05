
import React from "react";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "../context/ThemeContext"; // ✅ Correct import

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useThemeContext(); // ✅ Use `useThemeContext()`

  return (
    <IconButton onClick={toggleDarkMode} color="inherit">
      {darkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default DarkModeToggle;
