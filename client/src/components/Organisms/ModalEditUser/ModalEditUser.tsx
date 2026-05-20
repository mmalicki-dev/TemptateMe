import styles from "./ModalEditUser.module.css";
import { ReactComponent as IconUser } from "./icon-user.svg";
import { ReactComponent as IconPlus } from "./icon-plus.svg";
import { ReactComponent as IconEdit } from "./icon-edit.svg";
import { ReactComponent as IconName } from "./icon-name.svg";
import { Modal } from "../../Templates/Modal/Modal.tsx";
import { RectangleButton } from "../../Atoms/RectangleButton/RectangleButton.tsx";
import { useState, useEffect } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { useAuth } from "../../../hooks/index.ts";
import { useDispatch } from "react-redux";
import {
  deleteUser,
  updateUsersAvatar,
  updateUsersInfo,
} from "../../../redux/auth/operations.ts";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import type { AppDispatch } from "../../../redux/store.ts";

interface ModalEditUserProps {
  closeModal: () => void;
}

const ModalEditUser = ({ closeModal }: ModalEditUserProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const [file, setFile] = useState<File | undefined>();
  const [name, setName] = useState(user?.name ?? "");
  const [imageUrl, setImageUrl] = useState(user?.photoUrl ?? "");
  const { isDark } = useDarkMode();

  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [file]);

  useEffect(() => {}, [name]);

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0]);
  };

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const imageInput = event.currentTarget.elements.namedItem(
      "image",
    ) as HTMLInputElement;
    if (imageInput.value) {
      dispatch(updateUsersAvatar(file));
    }
    if (name !== user?.name) {
      dispatch(updateUsersInfo({ name }));
    }
  };

  const handleDelete = () => {
    dispatch(deleteUser());
  };

  return (
    <Modal onClose={closeModal}>
      <form className={styles.ModalEditUser} data-modal onSubmit={handleSubmit}>
        <div className={styles.user} data-modal>
          <input
            className={styles.image}
            type="file"
            name="image"
            id="recipeImage"
            accept="image/png, image/jpg, image/jpeg"
            onChange={onUpload}
          />
          {!imageUrl && (
            <div className={styles.iconUser} data-modal>
              <IconUser />
            </div>
          )}
          {imageUrl && (
            <img
              className={styles.imageBackground}
              src={imageUrl}
              alt="Preview"
            />
          )}
          <div className={styles.iconPlus} data-modal>
            <IconPlus />
          </div>
        </div>
        <div
          className={[styles.inputContainer, isDark && styles.isDark].join(" ")}
          data-modal
        >
          <div className={styles.iconName}>
            <IconName />
          </div>
          <input
            className={styles.inputName}
            type="text"
            id="name"
            value={name}
            onChange={handleName}
          />
          <div className={styles.iconEdit} data-modal>
            <IconEdit />
          </div>
        </div>
        <RectangleButton title="Save changes" type="submit" />
      </form>
      <button className={styles.delete} onClick={handleDelete}>
        Delete user
      </button>
    </Modal>
  );
};

export { ModalEditUser };
