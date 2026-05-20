import styles from "./Header.module.css";
import { Logo } from "../../Atoms/Logo/Logo.tsx";
import { Navigation } from "../Navigation/Navigation.tsx";
import { UserHeader } from "../../Molecules/UserHeader/UserHeader.tsx";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.Header}>
      <Link to="/home" className={styles.icon}>
        <Logo />
      </Link>
      <div className={styles.nav}>
        <Navigation />
      </div>
      <UserHeader />
    </header>
  );
};

export { Header };
