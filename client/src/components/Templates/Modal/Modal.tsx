import type { ReactNode } from "react";
import styles from "./Modal.module.css";
import { ReactComponent as IconClose } from "./icon-close.svg";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";

interface ModalProps {
  onClose?: () => void;
  children: ReactNode;
}

const Modal = ({ onClose = () => {}, children }: ModalProps) => {
  const { isDark } = useDarkMode();

  return (
    <div className={styles.backdrop} id="backdrop">
      <div
        className={[styles.Modal, isDark && styles.isDark].join(" ")}
        data-modal="true"
      >
        <button
          className={[styles.button, isDark && styles.isDark].join(" ")}
          type="button"
          onClick={onClose}
        >
          <IconClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export { Modal };
