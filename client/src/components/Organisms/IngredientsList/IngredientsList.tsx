import styles from "./IngredientsList.module.css";
import { IngredientsListItem } from "../../Molecules/IngredientsListItem/IngredientsListItem.tsx";
import { useIngredients, useShopping } from "../../../hooks/index.ts";
import type { RecipeIngredient } from "../../../types/index.ts";

interface IngredientsListProps {
  ingredientsList: RecipeIngredient[];
  recipeId: string;
  recipeName: string;
}

const IngredientsList = ({ ingredientsList, recipeId, recipeName }: IngredientsListProps) => {
  const { ingredients } = useIngredients();
  const { shoppingList } = useShopping();

  const isChecked = (ingredientId: string): boolean =>
    shoppingList.some(
      (item) => item.recipeId === recipeId && item.ingredientId === ingredientId,
    );

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
              recipeId={recipeId}
              recipeName={recipeName}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export { IngredientsList };
