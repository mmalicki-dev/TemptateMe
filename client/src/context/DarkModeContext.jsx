import { createContext, useContext, useState } from "react";

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const setDarkMode = () => {
    setIsDark(!isDark);
    try {
      localStorage.setItem("isDark-theme", !isDark);
    } catch {
      console.log("Saving theme faild.");
    }
  };

  return (
    <DarkModeContext.Provider value={{ isDark, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
