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
        className={isBigger ? styles.fbS : styles.fbXS}
        isBigger={isBigger}
      >
        <FacebokIcon />
      </SocialIcon>
      <SocialIcon
        link="https://www.youtube.com/"
        className={isBigger ? styles.ytS : styles.ytXS}
        isBigger={isBigger}
      >
        <YoutubeIcon />
      </SocialIcon>
      <SocialIcon
        link="https://twitter.com"
        className={isBigger ? styles.twitterS : styles.twitterXS}
        isBigger={isBigger}
      >
        <TwitterIcon />
      </SocialIcon>
      <SocialIcon
        link="https://www.instagram.com/"
        className={isBigger ? styles.instaS : styles.instaXS}
        isBigger={isBigger}
      >
        <InstagramIcon />
      </SocialIcon>
    </div>
  );
};

export { Socials };
