import { AddIngredientName } from "../../Atoms/AddIngredientName/AddIngredientName.tsx";
import { AddIngredientUnit } from "../../Atoms/AddIngredientUnit/AddIngredientUnit.tsx";
import { AddIngredientCloseButton } from "../../Atoms/AddIngredientCloseButton/AddIngredientCloseButton.tsx";
import styles from "./AddIngredientsItem.module.css";
import { MouseEvent } from "react";

interface AddIngredientsItemProps {
  id: number;
  onClose: (event: MouseEvent<HTMLButtonElement>) => void;
}

const AddIngredientsItem = ({ id, onClose }: AddIngredientsItemProps) => {
  return (
    <li className={styles.AddIngredientsItem}>
      <div className={styles.Input}>
        <AddIngredientName index={id} />
      </div>
      <div>
        <AddIngredientUnit index={id} />
      </div>
      <div className={styles.CloseButton}>
        <AddIngredientCloseButton onClick={onClose} id={id} />
      </div>
    </li>
  );
};

export { AddIngredientsItem };
