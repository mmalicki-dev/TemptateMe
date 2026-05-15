import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styles from "./EmailVerifiedPage.module.css";

const REDIRECT_DELAY = 5;

const EmailVerifiedPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(REDIRECT_DELAY);

  const error = searchParams.get("error");
  const success = searchParams.get("status") === "success";

  useEffect(() => {
    if (countdown === 0) {
      navigate(success ? "/home" : "/");
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate, success]);

  return (
    <div className={styles.page}>
      <Helmet>
        <title>{success ? "Email Verified" : "Verification Failed"}</title>
      </Helmet>
      <div className={styles.card}>
        <span className={styles.icon}>{success ? "✓" : "✕"}</span>
        <h1 className={styles.title}>
          {success ? "Email verified!" : "Verification failed"}
        </h1>
        <p className={styles.message}>
          {success
            ? "Your account is now active. You can sign in."
            : error ?? "Something went wrong."}
        </p>
        <p className={styles.redirect}>
          Redirecting in {countdown}s…
        </p>
      </div>
    </div>
  );
};

export { EmailVerifiedPage };
