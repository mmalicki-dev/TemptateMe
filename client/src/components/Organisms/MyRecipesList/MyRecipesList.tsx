import styles from "./MyRecipesList.module.css";
import { MyRecipesListItem } from "../../Molecules/MyRecipesListItem/MyRecipesListItem.tsx";
import { useRecipes } from "../../../hooks/index.ts";
import { NotFound } from "../../Atoms/NotFound/NotFound.tsx";
import { Loader } from "../../Atoms/Loader/Loader.tsx";

interface MyRecipesListProps {
  isFavorites?: boolean;
}

const MyRecipesList = ({ isFavorites = false }: MyRecipesListProps) => {
  const { recipes, isLoading } = useRecipes();

  return isLoading ? (
    <Loader />
  ) : recipes.length > 0 ? (
    Array.isArray(recipes) && (
      <ul className={styles.MyRecipesList}>
        {recipes.map((recipe) => (
          <MyRecipesListItem key={recipe._id} recipe={recipe} isFavorites={isFavorites} />
        ))}
      </ul>
    )
  ) : (
    <NotFound title="There are no recipes." />
  );
};

export { MyRecipesList };
