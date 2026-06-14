import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchRecipesByCategory,
  updatePage,
} from "../../../redux/recipes/operations.ts";
import { useCategories, useRecipes } from "../../../hooks/index.ts";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import type { AppDispatch } from "../../../redux/store.ts";
import styles from "./CategoriesList.module.css";

const CategoriesList = () => {
  const [category, setCategory] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { categoriesTitles } = useCategories();
  const { page } = useRecipes();
  const { isDark } = useDarkMode();

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;
    dispatch(updatePage(0));
    if (categoriesTitles.includes(id)) {
      setCategory(id);
      setSearchParams({ category: id });
    }
  };

  useEffect(() => {
    const cat = searchParams.get("category");
    setCategory(cat ?? "Breakfast");
  }, [searchParams]);

  useEffect(() => {
    if (category) dispatch(fetchRecipesByCategory({ category, page }));
  }, [category, page, dispatch]);

  return (
    <ul
      className={[styles.CategoriesList, isDark && styles.isDark]
        .filter(Boolean)
        .join(" ")}
    >
      {categoriesTitles.map((item) => {
        return (
          <li key={item} className={styles.listItem}>
            <button
              className={category === item ? styles.marked : styles.button}
              onClick={onClick}
              id={item}
            >
              {item}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export { CategoriesList };
