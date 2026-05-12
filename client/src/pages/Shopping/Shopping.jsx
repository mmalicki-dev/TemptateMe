import styles from "./Shopping.module.css";
import { useDispatch } from "react-redux";
import { fetchShoppingList } from "../../redux/shopping/operations";
import { useEffect } from "react";
import { PageTitle } from "../../components/Atoms/PageTitle/PageTitle";
import { ShoppingList } from "../../components/Organisms/ShoppingList/ShoppingList";
import { fetchIngredients } from "../../redux/ingredients/operations";
import { Helmet } from "react-helmet-async";

const ShoppingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShoppingList());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.Shopping}>
      <Helmet>
        <title>Shopping list</title>
      </Helmet>
      <PageTitle title={"Shopping list"} />
      <ShoppingList />
    </div>
  );
};

export { ShoppingPage };
