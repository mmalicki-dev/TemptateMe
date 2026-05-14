import styles from "./UserWindow.module.css";
import { CurvedButton } from "../CurvedButton/CurvedButton.jsx";
import { ReactComponent as LogoutIcon } from "./icon-logout.svg";
import { ReactComponent as EditIcon } from "./icon-edit.svg";
import { useEffect, useState } from "react";
import { ModalLogout } from "../../Organisms/ModalLogout/ModalLogout.jsx";
import { ModalEditUser } from "../../Organisms/ModalEditUser/ModalEditUser.jsx";
import { useDarkMode } from "../../../context/DarkModeContext.jsx";

const UserWindow = ({ onClose }) => {
  const [modalLogout, setModalLogout] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const { isDark } = useDarkMode();

  const close = (event) => {
    if (event.target.id === "backdrop") {
      setModalLogout(false);
      setModalEdit(false);
      return;
    }
    if (
      event.target.dataset.modal ||
      event.target.nodeName === "INPUT" ||
      event.target.nodeName === "BUTTON"
    ) {
      return;
    }
    if (!event.target.dataset.userWindow) {
      onClose();
    }
  };
  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("click", close);
    }, 100);
    return () => {
      window.removeEventListener("click", close);
    };
  });

  const openModalLogout = () => {
    setModalLogout(true);
  };

  const closeModalLogout = () => {
    setModalLogout(false);
  };
  const openModalEdit = () => {
    setModalEdit(true);
  };

  const closeModalEdit = () => {
    setModalEdit(false);
  };
  return (
    <div
      className={[styles.UserWindow, isDark && styles.isDark].join(" ")}
      data-user-window="true"
    >
      <button className={styles.editButton} onClick={openModalEdit}>
        Edit profile <EditIcon />
      </button>
      <CurvedButton greenOrBlack="green" size="small" onClick={openModalLogout}>
        <span>Logout</span>{" "}
        <div className={styles.icon}>
          <LogoutIcon />
        </div>
      </CurvedButton>
      {modalLogout && <ModalLogout closeModal={closeModalLogout} />}
      {modalEdit && <ModalEditUser closeModal={closeModalEdit} />}
    </div>
  );
};

export { UserWindow };
