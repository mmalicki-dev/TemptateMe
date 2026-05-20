import { useState } from "react";
import type { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { addProduct, deleteProduct } from "../../../redux/shopping/operations.ts";
import { useRecipes } from "../../../hooks/index.ts";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import type { Ingredient, Recipe } from "../../../types/index.ts";
import type { AppDispatch } from "../../../redux/store.ts";
import styles from "./IngredientsListItem.module.css";

interface IngredientsListItemProps {
  ingredient: Ingredient;
  measure: string;
  isChecked?: boolean;
}

const IngredientsListItem = ({
  ingredient,
  measure,
  isChecked = false,
}: IngredientsListItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes } = useRecipes();
  const [check, setCheck] = useState(isChecked);
  const { isDark } = useDarkMode();
  const recipe = recipes[0] as Recipe | undefined;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(
        addProduct({
          id: ingredient._id,
          measure,
          recipeId: recipe?._id ?? "",
          recipeName: recipe?.title ?? "",
        }),
      );
      setCheck(true);
    } else {
      dispatch(deleteProduct({ id: ingredient._id }));
      setCheck(false);
    }
  };

  return ingredient ? (
    <li
      className={[styles.IngredientsListItem, isDark && styles.isDark].join(" ")}
    >
      <div className={styles.name}>
        <img alt={ingredient.ttl} src={ingredient.thb} className={styles.image} />
        <span>{ingredient.ttl}</span>
      </div>
      <div className={styles.numberList}>
        <div className={styles.measure}>{measure}</div>
        <input
          type="checkbox"
          checked={check}
          className={styles.list}
          onChange={onChange}
        />
      </div>
    </li>
  ) : null;
};

export { IngredientsListItem };
