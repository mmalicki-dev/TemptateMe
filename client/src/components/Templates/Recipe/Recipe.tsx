import styles from "./Recipe.module.css";
import { RecipeDetails } from "../../Molecules/RecipeDetails/RecipeDetails.tsx";
import { IngredientsList } from "../../Organisms/IngredientsList/IngredientsList.tsx";
import { PreparationList } from "../../Organisms/PreparationList/PreparationList.tsx";
import { useRecipes } from "../../../hooks/index.ts";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchShoppingList } from "../../../redux/shopping/operations.ts";
import { fetchIngredients } from "../../../redux/ingredients/operations.ts";
import { Loader } from "../../Atoms/Loader/Loader.tsx";
import type { AppDispatch } from "../../../redux/store.ts";
import type { Recipe as RecipeType } from "../../../types/index.ts";

const Recipe = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, isLoading } = useRecipes();
  const recipe = recipes as unknown as RecipeType;

  useEffect(() => {
    dispatch(fetchShoppingList());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <RecipeDetails recipe={recipe} />
      <div className={styles.Recipe}>
        <IngredientsList ingredientsList={recipe.ingredients} />
        <PreparationList
          preparation={recipe.instructions}
          alt={recipe.title}
          src={recipe.thumb}
        />
      </div>
    </>
  );
};

export { Recipe };
