import type { SubmitEvent } from "react";
import { RectangleInput } from "../RectangleInput/RectangleInput.tsx";
import { RectangleButton } from "../../Atoms/RectangleButton/RectangleButton.tsx";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import styles from "./Newsletter.module.css";

const Newsletter = () => {
  const { isDark } = useDarkMode();

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={styles.Newsletter} onSubmit={onSubmit}>
      <div className={styles.text}>
        <h2 className={styles.title}>Subscribe to our Newsletter</h2>
        <p className={styles.description}>
          Subscribe up to our newsletter. Be in touch with latest news and
          special offers, etc.
        </p>
      </div>
      <RectangleInput
        isEmail={true}
        placeholderText="Enter your email address"
      />
      <RectangleButton
        title="Subscribe"
        type="submit"
        colorScheme={isDark ? "black" : "green"}
      />
    </form>
  );
};

export { Newsletter };
