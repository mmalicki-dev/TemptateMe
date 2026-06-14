import type { ReactNode } from "react";
import styles from "./CurvedButton.module.css";

interface CurvedButtonProps {
  title?: string;
  type?: "button" | "submit" | "reset";
  greenOrBlack?: "green" | "black";
  size?: "big" | "small";
  isTransparent?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

const CurvedButton = ({
  title,
  type = "button",
  greenOrBlack,
  size = "big",
  isTransparent = false,
  disabled = false,
  onClick = () => {},
  children,
}: CurvedButtonProps) => {
  const classes = `${styles.CurvedButton} ${greenOrBlack ? styles[greenOrBlack] : ""} ${
    styles[size]
  } ${isTransparent ? styles.transparent : ""}`;
  return (
    <button className={classes} type={type} onClick={onClick} disabled={disabled}>
      {title}
      {children}
    </button>
  );
};

export { CurvedButton };
