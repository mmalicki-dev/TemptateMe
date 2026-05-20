import styles from "./LogoTitle.module.css";

const LogoTitle = () => {
  return (
    <div className={styles.LogoTitle}>
      Temptate<span className={styles.LogoMe}>Me</span>
    </div>
  );
};

export { LogoTitle };
