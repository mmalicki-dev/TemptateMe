import styles from "./MobileMenu.module.css";
import { Navigation } from "../Navigation/Navigation.tsx";
import { SwitchMode } from "../../Atoms/SwitchMode/SwitchMode.tsx";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import { Logo } from "../../Atoms/Logo/Logo.tsx";
import { Link } from "react-router-dom";
import { ReactComponent as IconClose } from "./icon-close.svg";
import { useState } from "react";
import type { MouseEvent } from "react";

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  const [shouldClose, setShouldClose] = useState(false);
  const { isDark } = useDarkMode();

  function close() {
    setShouldClose(true);
    onClose();
  }

  const handleNav = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("a")) {
      close();
    }
  };

  return (
    <button
      className={[
        styles.MobileMenu,
        shouldClose && styles.onClose,
        isDark && styles.isDark,
      ].join(" ")}
      onClick={handleNav}
      data-container
    >
      <div className={styles.logo}>
        <Link to="/home" className={styles.icon} onClick={close}>
          <Logo />
        </Link>
        <button className={styles.close} type="button" onClick={close}>
          <IconClose />
        </button>
      </div>
      <div className={styles.nav}>
        <Navigation />
      </div>
      <div className={styles.darkMode}>
        <SwitchMode />
      </div>
    </button>
  );
};

export { MobileMenu };
