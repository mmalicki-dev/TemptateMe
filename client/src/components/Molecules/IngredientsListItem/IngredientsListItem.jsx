import { useDispatch } from "react-redux";
import styles from "./IngredientsListItem.module.css";
import {
  addProduct,
  deleteProduct,
} from "../../../redux/shopping/operations.js";
import { useRecipes } from "../../../hooks/index.js";
import { useState } from "react";
import { useDarkMode } from "../../../context/DarkModeContext.jsx";

const IngredientsListItem = ({ ingredient, measure, isChecked = false }) => {
  const dispatch = useDispatch();
  const { recipes } = useRecipes();
  const [check, setCheck] = useState(isChecked);
  const { isDark } = useDarkMode();

  const onChange = (event) => {
    if (event.target.checked) {
      dispatch(
        addProduct({
          id: ingredient._id,
          measure,
          recipeId: recipes._id,
          recipeName: recipes.title,
        })
      );
      setCheck(true);
    } else {
      dispatch(
        deleteProduct({
          id: ingredient._id,
        })
      );
      setCheck(false);
    }
  };

  return (
    ingredient && (
      <li
        className={[styles.IngredientsListItem, isDark && styles.isDark].join(
          " "
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
            checked={check}
            className={styles.list}
            onChange={onChange}
          />
        </div>
      </li>
    )
  );
};

export { IngredientsListItem };
