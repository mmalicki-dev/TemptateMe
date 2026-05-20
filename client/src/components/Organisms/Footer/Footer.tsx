import styles from "./Footer.module.css";
import { Navigation } from "../Navigation/Navigation.tsx";
import { Socials } from "../../Molecules/Socials/Socials.tsx";
import { FooterTerms } from "../../Atoms/FooterTerms/FooterTerms.tsx";
import { Newsletter } from "../../Molecules/Newsletter/Newsletter.tsx";
import { FooterInfo } from "../../Molecules/FooterInfo/FooterInfo.tsx";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";

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
