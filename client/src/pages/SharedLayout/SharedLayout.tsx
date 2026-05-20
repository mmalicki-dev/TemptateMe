import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../../components/Organisms/Footer/Footer.tsx";
import { Header } from "../../components/Organisms/Header/Header.tsx";
import { useAuth } from "../../hooks/index.ts";
import { Loader } from "../../components/Atoms/Loader/Loader.tsx";

const SharedLayout = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div>
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
