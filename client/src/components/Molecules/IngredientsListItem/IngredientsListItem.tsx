import { memo, useCallback } from "react";
import type { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { addProduct, deleteProduct } from "../../../redux/shopping/operations.ts";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import type { Ingredient } from "../../../types/index.ts";
import type { AppDispatch } from "../../../redux/store.ts";
import styles from "./IngredientsListItem.module.css";

interface IngredientsListItemProps {
  ingredient: Ingredient | undefined;
  measure: string;
  isChecked?: boolean;
  recipeId: string;
  recipeName: string;
}

const IngredientsListItem = memo(({
  ingredient,
  measure,
  isChecked = false,
  recipeId,
  recipeName,
}: IngredientsListItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isDark } = useDarkMode();

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(addProduct({ id: ingredient?._id ?? "", measure, recipeId, recipeName }));
    } else {
      dispatch(deleteProduct({ id: ingredient?._id ?? "" }));
    }
  }, [dispatch, ingredient?._id, measure, recipeId, recipeName]);

  return ingredient ? (
    <li
      className={[styles.IngredientsListItem, isDark && styles.isDark].join(
        " ",
      )}
    >
      <div className={styles.name}>
        <img
          alt={ingredient.ttl}
          src={ingredient.thb}
          className={styles.image}
        />
        <span>{ingredient.ttl}</span>
      </div>
      <div className={styles.numberList}>
        <div className={styles.measure}>{measure}</div>
        <input
          type="checkbox"
          checked={isChecked}
          className={styles.list}
          onChange={onChange}
        />
      </div>
    </li>
  ) : null;
});

export { IngredientsListItem };
