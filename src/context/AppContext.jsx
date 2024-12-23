import React, { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../services/user";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser().then((data) => {
        if (data) {
          setUser(data);
          setIsDark(data.isDarkTheme);
        }
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <AppContext.Provider value={{ isDark, toggleTheme, user, isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
