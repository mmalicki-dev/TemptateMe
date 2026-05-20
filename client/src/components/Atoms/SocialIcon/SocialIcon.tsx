import type { ReactNode } from "react";
import styles from "./Socialcon.module.css";

interface SocialIconProps {
  link: string;
  className?: string;
  isBigger?: boolean;
  children: ReactNode;
}

const SocialIcon = ({
  link,
  className = "",
  isBigger,
  children,
}: SocialIconProps) => {
  const classes = isBigger
    ? `${className} ${styles.SocialBigger}`
    : `${className} ${styles.SocialIcon}`;
  return (
    <a href={link} className={classes}>
      {children}
    </a>
  );
};

export { SocialIcon };
