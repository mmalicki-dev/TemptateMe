import styles from "./Shopping.module.css";
import { useDispatch } from "react-redux";
import { fetchShoppingList } from "../../redux/shopping/operations.ts";
import { useEffect } from "react";
import { PageTitle } from "../../components/Atoms/PageTitle/PageTitle.tsx";
import { ShoppingList } from "../../components/Organisms/ShoppingList/ShoppingList.tsx";
import { fetchIngredients } from "../../redux/ingredients/operations.ts";
import { Helmet } from "react-helmet-async";
import type { AppDispatch } from "../../redux/store.ts";

const ShoppingPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchShoppingList());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.Shopping}>
      <Helmet>
        <title>Shopping list</title>
      </Helmet>
      <PageTitle title="Shopping list" />
      <ShoppingList />
    </div>
  );
};

export { ShoppingPage };
