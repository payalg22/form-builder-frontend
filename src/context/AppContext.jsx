import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <AppContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
