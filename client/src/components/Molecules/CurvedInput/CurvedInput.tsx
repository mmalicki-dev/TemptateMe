import type { ChangeEvent, SubmitEvent } from "react";
import { CurvedButton } from "../../Atoms/CurvedButton/CurvedButton.tsx";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import styles from "./CurvedInput.module.css";

interface CurvedInputProps {
  placeholderText?: string;
  buttonText?: string;
  greenOrBlack?: "green" | "black";
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onSubmit?: (event: SubmitEvent<HTMLFormElement>) => void;
}

const CurvedInput = ({
  placeholderText,
  buttonText,
  greenOrBlack,
  onChange = () => {},
  onClick = () => {},
  onSubmit = (event) => event.preventDefault(),
}: CurvedInputProps) => {
  const { isDark } = useDarkMode();
  const labelClasses = `${styles.CurvedInput} ${isDark ? styles.isDark : ""}`;
  return (
    <form className={labelClasses} onSubmit={onSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholderText}
        onChange={onChange}
      />
      <CurvedButton
        title={buttonText}
        greenOrBlack={greenOrBlack}
        onClick={onClick}
      />
    </form>
  );
};

export { CurvedInput };
