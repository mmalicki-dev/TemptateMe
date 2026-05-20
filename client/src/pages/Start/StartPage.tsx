import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import styles from "./StartPage.module.css";
import { Logo } from "../../components/Atoms/Logo/Logo.tsx";
import { CurvedButton } from "../../components/Atoms/CurvedButton/CurvedButton.tsx";
import { login } from "../../redux/auth/operations.ts";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import type { AppDispatch } from "../../redux/store.ts";

const StartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const handleDemo = async () => {
    setLoading(true);
    try {
      await dispatch(
        login({ email: "example@example.com", password: "example" })
      ).unwrap();
    } catch {
      Notify.failure("Demo account unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.StartPage}>
      <div className={styles.icon}>
        <Logo />
      </div>
      <h1 className={styles.title}>Welcome to the app!</h1>
      <p className={styles.comment}>
        This app offers more than just a collection of recipes - it is designed
        to be your very own digital cookbook. You can easily save and retrieve
        your own recipes at any time.
      </p>
      <div className={styles.buttons}>
        <Link to="register">
          <CurvedButton title="Registration" greenOrBlack="green" />
        </Link>
        <Link to="signin">
          <CurvedButton title="Sign in" />
        </Link>
      </div>
      <CurvedButton
        title={loading ? "Loading..." : "Try Demo"}
        isTransparent={true}
        onClick={handleDemo}
      />
    </section>
  );
};

export { StartPage };
