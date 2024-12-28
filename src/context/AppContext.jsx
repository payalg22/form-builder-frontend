import React, { createContext, useContext, useEffect, useState } from "react";
import { getUser, setTheme } from "../services/user";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDark, setIsDark] = useState();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (token) {
      getUserDetails();
    } else {
        //if not user then default theme will be applied
      setIsDark(true);
    }
  }, [token]);

  function getUserDetails() {
    getUser()
      .then((data) => {
        if (data) {
          setUser(data);
          setIsDark(data.isDarkTheme);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    //Update theme in the backend
    if (user && isDark !== user.isDarkTheme) {
      setTheme(isDark).then(() => {
        getUserDetails();
      });
    }
  }, [isDark]);

  return (
    <AppContext.Provider
      value={{ isDark, toggleTheme, user, isLoading, setIsLoading, setToken }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
