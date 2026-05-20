import styles from "./ModalLogout.module.css";
import { Modal } from "../../Templates/Modal/Modal.tsx";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/auth/operations.ts";
import { RectangleButton } from "../../Atoms/RectangleButton/RectangleButton.tsx";
import type { AppDispatch } from "../../../redux/store.ts";

interface ModalLogoutProps {
  closeModal?: () => void;
}

const ModalLogout = ({ closeModal = () => {} }: ModalLogoutProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Modal onClose={closeModal}>
      <div className={styles.ModalLogout}>
        <span>Are you sure you want to logout?</span>
        <div className={styles.buttons}>
          <RectangleButton title="Log out" onClick={handleLogout} />
          <RectangleButton title="Cancel" onClick={closeModal} colorScheme="gray" />
        </div>
      </div>
    </Modal>
  );
};

export { ModalLogout };
