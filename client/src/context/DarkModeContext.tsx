import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface DarkModeContextValue {
  isDark: boolean;
  setDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextValue>({
  isDark: false,
  setDarkMode: () => {},
});

export const useDarkMode = (): DarkModeContextValue =>
  useContext(DarkModeContext);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  const setDarkMode = () => {
    setIsDark(!isDark);
    try {
      localStorage.setItem("isDark-theme", String(!isDark));
    } catch {
      console.log("Saving theme failed.");
    }
  };

  const value = useMemo(() => ({ isDark, setDarkMode }), [isDark, setDarkMode]);

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};
