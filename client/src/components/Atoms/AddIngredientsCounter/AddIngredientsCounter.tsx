import { ReactComponent as IconMinus } from "./iconMinus.svg";
import { ReactComponent as IconPlus } from "./iconPlus.svg";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import styles from "./AddIngredientsCounter.module.css";

interface AddIngredientsCounterProps {
  plusCb: () => void;
  minusCb: () => void;
  counter: number;
}

const AddIngredientsCounter = ({
  plusCb,
  minusCb,
  counter,
}: AddIngredientsCounterProps) => {
  const { isDark } = useDarkMode();
  return (
    <div
      className={[styles.AddIngredientsCounter, isDark && styles.isDark].join(
        " ",
      )}
    >
      <button type="button" onClick={minusCb} className={styles.button}>
        <div className={[styles.minusIcon, isDark && styles.isDark].join(" ")}>
          <IconMinus />
        </div>
      </button>
      {counter}
      <button type="button" onClick={plusCb} className={styles.button}>
        <div className={styles.plusIcon}>
          <IconPlus />
        </div>
      </button>
    </div>
  );
};

export { AddIngredientsCounter };
