import styles from "./Newsletter.module.css";
import { RectangleInput } from "../RectangleInput/RectangleInput.jsx";
import { RectangleButton } from "../../Atoms/RectangleButton/RectangleButton.jsx";
import { useDarkMode } from "../../../context/DarkModeContext.jsx";

const Newsletter = () => {
  const { isDark } = useDarkMode();
  const onSubmit = (event) => {
    event.preventDefault();
    console.log("test");
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
        placeholderText="Enter your email adress"
      />
      {!isDark && <RectangleButton title="Subscribe" type="submit" />}
      {isDark && (
        <RectangleButton title="Subscribe" type="submit" colorScheme="black" />
      )}
    </form>
  );
};

export { Newsletter };
