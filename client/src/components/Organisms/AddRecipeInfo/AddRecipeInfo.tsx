import styles from "./AddRecipeInfo.module.css";
import { AddRecipeInfoInput } from "../../Molecules/AddRecipeInfoInput/AddRecipeInfoInput.tsx";

const AddRecipeInfo = () => {
  return (
    <div className={styles.AddRecipeInfo}>
      <AddRecipeInfoInput placeholder="Enter recipe name" idName="recipeName" />
      <AddRecipeInfoInput placeholder="Enter about recipe" idName="recipeAbout" />
      <AddRecipeInfoInput placeholder="Category" idName="recipeCategory" isCategory={true} />
      <AddRecipeInfoInput placeholder="Cooking Time" idName="recipeTime" isTime={true} />
    </div>
  );
};

export { AddRecipeInfo };
