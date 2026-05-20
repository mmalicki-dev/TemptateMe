import type { SubmitEvent } from "react";
import { Link } from "react-router-dom";
import styles from "./AuthForm.module.css";
import { RectangleInput } from "../../Molecules/RectangleInput/RectangleInput.tsx";
import { RectangleButton } from "../../Atoms/RectangleButton/RectangleButton.tsx";
import { useDispatch } from "react-redux";
import { register, login } from "../../../redux/auth/operations.ts";
import type { AppDispatch } from "../../../redux/store.ts";

interface AuthFormProps {
  isRegister: boolean;
}

const AuthForm = ({ isRegister }: AuthFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const onSubmitRegister = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const els = event.currentTarget.elements;
    const val = (id: string) => (els.namedItem(id) as HTMLInputElement).value;
    dispatch(
      register({
        name: val("text"),
        email: val("email"),
        password: val("password"),
      }),
    );
  };

  const onSubmitLogin = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const els = event.currentTarget.elements;
    const val = (id: string) => (els.namedItem(id) as HTMLInputElement).value;
    dispatch(login({ email: val("email"), password: val("password") }));
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.AuthForm}
        onSubmit={isRegister ? onSubmitRegister : onSubmitLogin}
      >
        {isRegister && <h1 className={styles.title}>Sign up</h1>}
        {!isRegister && <h1 className={styles.title}>Sign in</h1>}
        <div className={styles.inputContainer}>
          {isRegister && (
            <RectangleInput isName={true} placeholderText="Name" />
          )}
          <RectangleInput isEmail={true} placeholderText="Email" />
          <RectangleInput isPassword={true} placeholderText="Password" />
        </div>
        {isRegister && <RectangleButton title="Sign up" type="submit" />}
        {!isRegister && <RectangleButton title="Sign in" type="submit" />}
      </form>
      {!isRegister && (
        <Link to="/register" className={styles.link}>
          Registration
        </Link>
      )}
      {isRegister && (
        <Link to="/signin" className={styles.link}>
          Sign in
        </Link>
      )}
    </div>
  );
};

export { AuthForm };
