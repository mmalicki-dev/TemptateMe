import { useState } from "react";
import { UserInfo } from "../../Atoms/UserInfo/UserInfo.tsx";
import { MenuIcon } from "../../Atoms/MenuIcon/MenuIcon.tsx";
import { SwitchMode } from "../../Atoms/SwitchMode/SwitchMode.tsx";
import { UserWindow } from "../../Atoms/UserWindow/UserWindow.tsx";
import { MobileMenu } from "../../Organisms/MobileMenu/MobileMenu.jsx";
import styles from "./UserHeader.module.css";

const UserHeader = () => {
  const [openUserWindow, setOpenUserWindow] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleCloseMenu = () => {
    setTimeout(() => setOpenMenu(false), 1000);
  };

  return (
    <div className={styles.UserHeader}>
      <UserInfo onClick={() => setOpenUserWindow(true)} />
      <button className={styles.menuIcon} onClick={() => setOpenMenu(true)}>
        <MenuIcon />
      </button>
      {openMenu && <MobileMenu onClose={handleCloseMenu} />}
      <div className={styles.switchIcon}>
        <SwitchMode />
      </div>
      {openUserWindow && (
        <UserWindow onClose={() => setOpenUserWindow(false)} />
      )}
    </div>
  );
};

export { UserHeader };
