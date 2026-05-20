import { ReactComponent as HamburgerIcon } from "./icon-menu.svg";
import styles from "./MenuIcon.module.css";

const MenuIcon = () => {
  return (
    <div className={styles.icon}>
      <HamburgerIcon />
    </div>
  );
};

export { MenuIcon };
