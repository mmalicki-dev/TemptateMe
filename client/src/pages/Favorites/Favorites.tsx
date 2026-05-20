import styles from "./Favorites.module.css";
import { PageTitle } from "../../components/Atoms/PageTitle/PageTitle.tsx";
import { Pagination } from "../../components/Atoms/Pagination/Pagination.tsx";
import { MyRecipesList } from "../../components/Organisms/MyRecipesList/MyRecipesList.tsx";
import { useRecipes } from "../../hooks/index.ts";
import { useDispatch } from "react-redux";
import { fetchFavorites } from "../../redux/recipes/operations.ts";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import type { AppDispatch } from "../../redux/store.ts";

const FavoritesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { page, pageAmount } = useRecipes();

  useEffect(() => {
    dispatch(fetchFavorites(page));
  }, [dispatch, page]);

  return (
    <div className={styles.Favorites}>
      <Helmet>
        <title>Favorites</title>
      </Helmet>
      <PageTitle title="Favorites" />
      <MyRecipesList isFavorites={true} />
      {pageAmount > 1 && <Pagination />}
    </div>
  );
};

export { FavoritesPage };
