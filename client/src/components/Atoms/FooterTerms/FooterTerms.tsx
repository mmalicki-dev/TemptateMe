import styles from "./FooterTerms.module.css";

const FooterTerms = () => {
  return (
    <div className={styles.FooterTerms}>
      <span className={styles.rights}>© 2023 All Rights Reserved.</span>
      <span className={styles.terms}>Terms of Service</span>
    </div>
  );
};

export { FooterTerms };
