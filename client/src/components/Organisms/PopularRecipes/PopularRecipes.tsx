import styles from "./PopularRecipes.module.css";
import { AddRecipeHeader } from "../../Atoms/AddRecipeHeader/AddRecipeHeader.tsx";
import { PopularList } from "../../Molecules/PopularList/PopularList.tsx";

const PopularRecipes = () => {
  return (
    <div className={styles.PopularRecipes}>
      <AddRecipeHeader>Popular Recipes</AddRecipeHeader>
      <PopularList />
    </div>
  );
};

export { PopularRecipes };
