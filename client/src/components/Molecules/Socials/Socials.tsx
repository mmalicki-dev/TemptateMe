import { SocialIcon } from "../../Atoms/SocialIcon/SocialIcon.tsx";
import { ReactComponent as FacebokIcon } from "./icon-facebook.svg";
import { ReactComponent as YoutubeIcon } from "./icon-youtube.svg";
import { ReactComponent as TwitterIcon } from "./icon-twitter.svg";
import { ReactComponent as InstagramIcon } from "./icon-instagram.svg";
import styles from "./Socials.module.css";

interface SocialsProps {
  isBigger?: boolean;
}

const Socials = ({ isBigger = false }: SocialsProps) => {
  return (
    <div className={styles.Socials}>
      <SocialIcon
        link="https://www.facebook.com/"
        className={!isBigger ? styles.fbXS : styles.fbS}
        isBigger={isBigger}
      >
        <FacebokIcon />
      </SocialIcon>
      <SocialIcon
        link="https://www.youtube.com/"
        className={!isBigger ? styles.ytXS : styles.ytS}
        isBigger={isBigger}
      >
        <YoutubeIcon />
      </SocialIcon>
      <SocialIcon
        link="https://twitter.com"
        className={!isBigger ? styles.twitterXS : styles.twitterS}
        isBigger={isBigger}
      >
        <TwitterIcon />
      </SocialIcon>
      <SocialIcon
        link="https://www.instagram.com/"
        className={!isBigger ? styles.instaXS : styles.instaS}
        isBigger={isBigger}
      >
        <InstagramIcon />
      </SocialIcon>
    </div>
  );
};

export { Socials };
