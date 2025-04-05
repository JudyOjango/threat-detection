import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ✅ Corrected Export for useThemeContext
export const useThemeContext = () => useContext(ThemeContext);
