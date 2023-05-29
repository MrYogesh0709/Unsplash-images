import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
  const preferDarkMode = window.matchMedia(
    "(prefer-color-scheme:dark)"
  ).matches;
  const storedDark = localStorage.getItem("darkTheme") === "true";
  return preferDarkMode || storedDark;
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem("darkTheme", isDarkTheme);
  };

  const [searchTerm, setSearchTerm] = useState("cat");

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
