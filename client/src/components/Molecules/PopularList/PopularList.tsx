import { PopularListItem } from "../../Atoms/PopularListItem/PopularListItem.tsx";
import { useRecipes } from "../../../hooks/index.ts";
import styles from "./PopularList.module.css";

const PopularList = () => {
  const { recipes } = useRecipes();
  return Array.isArray(recipes) ? (
    <ul className={styles.AddPopularList}>
      {recipes.map((recipe, index) => (
        <PopularListItem
          key={Math.floor(Math.random() * 100) + 1}
          recipe={recipe}
        />
      ))}
    </ul>
  ) : null;
};

export { PopularList };
