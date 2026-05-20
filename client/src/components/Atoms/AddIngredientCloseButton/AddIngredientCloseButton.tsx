import { ReactComponent as Icon } from "./iconCloseButton.svg";
import styles from "./AddIngredientCloseButton.module.css";
import { MouseEvent } from "react";

interface AddIngredientCloseButtonProps {
  id: number | string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const AddIngredientCloseButton = ({
  id,
  onClick,
}: AddIngredientCloseButtonProps) => {
  return (
    <button
      type="button"
      className={styles.AddRecipeCloseButton}
      onClick={onClick}
      data-counter={id}
    >
      <div className={styles.icon}>
        <Icon />
      </div>
    </button>
  );
};

export { AddIngredientCloseButton };
