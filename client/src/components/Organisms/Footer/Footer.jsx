import styles from "./Footer.module.css";
import { Navigation } from "../Navigation/Navigation.jsx";
import { Socials } from "../../Molecules/Socials/Socials.jsx";
import { FooterTerms } from "../../Atoms/FooterTerms/FooterTerms.jsx";
import { Newsletter } from "../../Molecules/Newsletter/Newsletter.jsx";
import { FooterInfo } from "../../Molecules/FooterInfo/FooterInfo.jsx";
import { useDarkMode } from "../../../context/DarkModeContext.jsx";

const Footer = () => {
  const { isDark } = useDarkMode();
  return (
    <>
      <div className={[styles.container, isDark && styles.isDark].join(" ")}>
        <footer className={styles.Footer}>
          <FooterInfo />
          <Navigation isFooter={true} />
          <Newsletter />
          <div className={styles.Socials}>
            <Socials />
          </div>
        </footer>
      </div>
      <FooterTerms />
    </>
  );
};

export { Footer };
