import styles from "./MyRecipes.module.css";
import { PageTitle } from "../../components/Atoms/PageTitle/PageTitle.jsx";
import { MyRecipesList } from "../../components/Organisms/MyRecipesList/MyRecipesList.jsx";
import { useRecipes } from "../../hooks/index.js";
import { useDispatch } from "react-redux";
import { fetchUserRecipes } from "../../redux/recipes/operations.js";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const MyRecipesPage = () => {
  const dispatch = useDispatch();
  const { page } = useRecipes();

  useEffect(() => {
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
