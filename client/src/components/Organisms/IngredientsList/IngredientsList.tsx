import styles from "./IngredientsList.module.css";
import { IngredientsListItem } from "../../Molecules/IngredientsListItem/IngredientsListItem.tsx";
import {
  useIngredients,
  useRecipes,
  useShopping,
} from "../../../hooks/index.ts";
import type { RecipeIngredient } from "../../../types/index.ts";

interface IngredientsListProps {
  ingredientsList: RecipeIngredient[];
}

const IngredientsList = ({ ingredientsList }: IngredientsListProps) => {
  const { ingredients } = useIngredients();
  const { shoppingList } = useShopping();
  const { recipes } = useRecipes();

  const isChecked = (ingredientId: string): boolean => {
    const recipe = recipes as unknown as { _id: string };
    return (
      shoppingList
        .filter((item) => item.recipeId === recipe._id)
        .map((item) => item.ingredientId === ingredientId).length > 0
    );
  };

  return (
    <>
      <div className={styles.head}>
        <span>Ingredients</span>
        <div className={styles.numberList}>
          <span>Number</span>
          <span>Add to list</span>
        </div>
      </div>
      {ingredients && (
        <ul className={styles.IngredientsList}>
          {ingredientsList.map((item) => (
            <IngredientsListItem
              key={item.id}
              ingredient={ingredients.find((ing) => ing._id === item.id)}
              measure={item.measure}
              isChecked={isChecked(item.id)}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export { IngredientsList };
