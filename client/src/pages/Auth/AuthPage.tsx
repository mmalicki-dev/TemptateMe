import styles from "./AuthPage.module.css";
import { AuthForm } from "../../components/Organisms/AuthForm/AuthForm.tsx";
import { AuthPageImage } from "../../components/Atoms/AuthPageImage/AuthPageImage.tsx";

interface AuthPageProps {
  isRegister: boolean;
}

const AuthPage = ({ isRegister }: AuthPageProps) => {
  return (
    <div className={styles.AuthPage}>
      <AuthPageImage />
      <AuthForm isRegister={isRegister} />
    </div>
  );
};

export { AuthPage };
