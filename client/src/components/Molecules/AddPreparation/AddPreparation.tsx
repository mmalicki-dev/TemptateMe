import { AddRecipeHeader } from "../../Atoms/AddRecipeHeader/AddRecipeHeader.tsx";
import { AddRecipeTextarea } from "../../Atoms/AddRecipeTextarea/AddRecipeTextarea.tsx";
import styles from "./AddPreparation.module.css";

const AddPreparation = () => {
  return (
    <div className={styles.AddPreparation}>
      <AddRecipeHeader>Recipe preparation</AddRecipeHeader>
      <AddRecipeTextarea />
    </div>
  );
};

export { AddPreparation };
