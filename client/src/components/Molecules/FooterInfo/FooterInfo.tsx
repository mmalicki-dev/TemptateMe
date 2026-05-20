import { Link } from "react-router-dom";
import { Logo } from "../../Atoms/Logo/Logo.tsx";
import styles from "./FooterInfo.module.css";

const FooterInfo = () => {
  return (
    <div className={styles.FooterInfo}>
      <Link to="/home" className={styles.Logo}>
        <div className={styles.icon}>
          <Logo />
        </div>{" "}
        TemptateMe
      </Link>
      <ul className={styles.List}>
        <li>Database of recipes that can be replenished</li>
        <li>Flexible search for desired and unwanted ingredients</li>
        <li>Ability to add your own recipes with photos</li>
        <li>Convenient and easy to use</li>
      </ul>
    </div>
  );
};

export { FooterInfo };
