import styles from "./MyRecipes.module.css";
import { PageTitle } from "../../components/Atoms/PageTitle/PageTitle.tsx";
import { MyRecipesList } from "../../components/Organisms/MyRecipesList/MyRecipesList.tsx";
import { useRecipes } from "../../hooks/index.ts";
import { useDispatch } from "react-redux";
import { fetchUserRecipes } from "../../redux/recipes/operations.ts";
import { clearItems } from "../../redux/recipes/slice.ts";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import type { AppDispatch } from "../../redux/store.ts";

const MyRecipesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { page } = useRecipes();

  useEffect(() => {
    dispatch(clearItems());
    dispatch(fetchUserRecipes(page));
  }, [dispatch, page]);

  return (
    <div className={styles.MyRecipes}>
      <Helmet>
        <title>My recipes</title>
      </Helmet>
      <PageTitle title="My recipes" />
      <MyRecipesList />
    </div>
  );
};

export { MyRecipesPage };
