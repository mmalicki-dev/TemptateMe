import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../../components/Organisms/Footer/Footer.tsx";
import { Header } from "../../components/Organisms/Header/Header.tsx";
import { useAuth } from "../../hooks/index.ts";
import { useDarkMode } from "../../context/DarkModeContext.tsx";
import { Loader } from "../../components/Atoms/Loader/Loader.tsx";
import styles from "./SharedLayout.module.css";

const SharedLayout = () => {
  const { isLoggedIn } = useAuth();
  const { isDark } = useDarkMode();
  return (
    <div className={isDark ? styles.wrapperDark : styles.wrapper}>
      {isLoggedIn && <Header />}
      <Suspense
        fallback={
          <div style={{ width: "100vw", height: "100vh", backgroundColor: "#00000080" }}>
            <Loader />
          </div>
        }
      >
        <Outlet />
      </Suspense>
      {isLoggedIn && <Footer />}
    </div>
  );
};

export { SharedLayout };
