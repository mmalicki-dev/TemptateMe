import { useEffect, useState } from "react";
import styles from "./SearchRecipe.module.css";
import {
  fetchPopularRecipes,
  fetchRecipesByQuery,
  updatePage,
} from "../../redux/recipes/operations.js";
import { useDispatch } from "react-redux";
import { PageTitle } from "../../components/Atoms/PageTitle/PageTitle.jsx";
import { CurvedInput } from "../../components/Molecules/CurvedInput/CurvedInput.jsx";
import { RecipesList } from "../../components/Organisms/RecipesList/RecipesList.jsx";
import useRecipes from "../../hooks/useRecipes.js";
import { NotFound } from "../../components/Atoms/NotFound/NotFound.jsx";
import { Helmet } from "react-helmet-async";
import { Pagination } from "../../components/Atoms/Pagination/Pagination.jsx";

const SearchRecipePage = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const { recipes, pageAmount, page } = useRecipes();

  const onChange = (event) => {
    const text = event.currentTarget.value;
    text && setText(text);
    !text && setText("");
  };

  const onClick = (event) => {
    event.preventDefault();
    setQuery(text);
    dispatch(updatePage(0));
    dispatch(fetchRecipesByQuery({ query, page }));
  };

  useEffect(() => {
    if (query) {
      dispatch(fetchRecipesByQuery({ query, page }));
      return;
    }
    dispatch(fetchPopularRecipes({ page }));
  }, [dispatch, page, query]);

  return (
    <div className={styles.SearchRecipe}>
      <Helmet>
        <title>Search recipe</title>
      </Helmet>
      <PageTitle title="Search" />
      <CurvedInput
        greenOrBlack="green"
        buttonText="Search"
        placeholderText="Enter query"
        onChange={onChange}
        onClick={onClick}
        onSubmit={onClick}
      />
      {recipes.length > 0 ? (
        <RecipesList />
      ) : (
        <NotFound title="Try looking for something else..." />
      )}
      {pageAmount > 1 && <Pagination />}
    </div>
  );
};

export { SearchRecipePage };
