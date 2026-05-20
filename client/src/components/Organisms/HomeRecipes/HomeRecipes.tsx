import { useRecipes } from "../../../hooks/index.ts";
import styles from "./HomeRecipes.module.css";
import { HomeRecipesList } from "../../Molecules/HomeRecipesList/HomeRecipesList.tsx";
import { Link } from "react-router-dom";
import { CurvedButton } from "../../Atoms/CurvedButton/CurvedButton.tsx";
import { RectangleButton } from "../../Atoms/RectangleButton/RectangleButton.tsx";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import { Loader } from "../../Atoms/Loader/Loader.tsx";

const HomeRecipes = () => {
  const { recipes, isLoading } = useRecipes();
  const { isDark } = useDarkMode();

  return isLoading ? (
    <Loader />
  ) : (
    Array.isArray(recipes) && (
      <ul className={styles.HomeRecipes}>
        {recipes.map((item) => (
          <li key={item._id} className={styles.listItem}>
            <span className={[styles.categoryTitle, isDark && styles.isDark].join(" ")}>
              {item.category}
            </span>
            <HomeRecipesList recipes={(item as any).recipes?.recipes} />
            <Link className={styles.button} to={`/categories?category=${item.category}`}>
              <RectangleButton title="See all" />
            </Link>
          </li>
        ))}
        <li className={styles.otherButton}>
          <Link to="/categories">
            <CurvedButton
              title="Other categories"
              greenOrBlack={isDark ? "" : undefined}
              isTransparent={true}
            />
          </Link>
        </li>
      </ul>
    )
  );
};

export { HomeRecipes };
