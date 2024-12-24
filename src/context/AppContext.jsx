import React, { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../services/user";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken]  = useState(localStorage.getItem("token") || null);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
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
  }, [token]);

  return (
    <AppContext.Provider value={{ isDark, toggleTheme, user, isLoading, setIsLoading, setToken }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
