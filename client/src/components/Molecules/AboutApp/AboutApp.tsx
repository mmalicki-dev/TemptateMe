import { LogoTitle } from "../../Atoms/LogoTitle/LogoTitle.tsx";
import styles from "./AboutApp.module.css";

const AboutApp = () => {
  return (
    <div className={styles.AboutApp}>
      <LogoTitle />
      <div className={styles.info}>
        "TemptateMe" is not only a recipe app, it is, in fact, your cookbook.
        You can add your own recipes to save them for the future.
      </div>
    </div>
  );
};

export { AboutApp };
