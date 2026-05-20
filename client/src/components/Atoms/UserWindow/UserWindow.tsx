import { useEffect, useState } from "react";
import { ReactComponent as LogoutIcon } from "./icon-logout.svg";
import { ReactComponent as EditIcon } from "./icon-edit.svg";
import { CurvedButton } from "../CurvedButton/CurvedButton.tsx";
import { ModalLogout } from "../../Organisms/ModalLogout/ModalLogout.jsx";
import { ModalEditUser } from "../../Organisms/ModalEditUser/ModalEditUser.jsx";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import styles from "./UserWindow.module.css";

interface UserWindowProps {
  onClose: () => void;
}

const UserWindow = ({ onClose }: UserWindowProps) => {
  const [modalLogout, setModalLogout] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const { isDark } = useDarkMode();

  const close = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.id === "backdrop") {
      setModalLogout(false);
      setModalEdit(false);
      return;
    }
    if (
      target.dataset.modal ||
      target.nodeName === "INPUT" ||
      target.nodeName === "BUTTON"
    ) {
      return;
    }
    if (!target.dataset.userWindow) {
      onClose();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      globalThis.addEventListener("click", close);
    }, 100);
    return () => {
      clearTimeout(timer);
      globalThis.removeEventListener("click", close);
    };
  });

  return (
    <div
      className={[styles.UserWindow, isDark && styles.isDark].join(" ")}
      data-user-window="true"
    >
      <button className={styles.editButton} onClick={() => setModalEdit(true)}>
        Edit profile <EditIcon />
      </button>
      <CurvedButton
        greenOrBlack="green"
        size="small"
        onClick={() => setModalLogout(true)}
      >
        <span>Logout</span>{" "}
        <div className={styles.icon}>
          <LogoutIcon />
        </div>
      </CurvedButton>
      {modalLogout && <ModalLogout closeModal={() => setModalLogout(false)} />}
      {modalEdit && <ModalEditUser closeModal={() => setModalEdit(false)} />}
    </div>
  );
};

export { UserWindow };
