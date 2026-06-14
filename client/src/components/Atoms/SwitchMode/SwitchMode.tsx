import { useEffect } from "react";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import styles from "./SwitchMode.module.css";

const SwitchMode = () => {
  const { isDark, setDarkMode } = useDarkMode();

  useEffect(() => {
    const stored = localStorage.getItem("isDark-theme");
    if (stored !== null && JSON.parse(stored) !== isDark) {
      setDarkMode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <label className={styles.SwitchMode} aria-label="Toggle dark mode">
      <input
        type="checkbox"
        className={styles.input}
        checked={isDark}
        onChange={setDarkMode}
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export { SwitchMode };
