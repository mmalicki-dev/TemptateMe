import styles from "./ShoppingList.module.css";
import { ShoppingListItem } from "../../Molecules/ShoppingListItem/ShoppingListItem.tsx";
import { useIngredients, useShopping } from "../../../hooks/index.ts";
import { NotFound } from "../../Atoms/NotFound/NotFound.tsx";
import { Loader } from "../../Atoms/Loader/Loader.tsx";

const ShoppingList = () => {
  const { shoppingList, isLoading } = useShopping();
  const { ingredients } = useIngredients();

  return isLoading ? (
    <Loader />
  ) : shoppingList.length > 0 ? (
    <>
      <div className={styles.head}>
        <span>Product</span>
        <div className={styles.numberList}>
          <span>Number</span>
          <span>Remove</span>
        </div>
      </div>
      {ingredients && (
        <ul className={styles.ShoppingList}>
          {shoppingList.map((item) => (
            <ShoppingListItem
              key={item._id}
              id={item._id}
              listItem={ingredients.filter((ing) => ing._id === item.ingredientId)[0]}
              measure={item.measure}
              recipeId={item.recipeId}
            />
          ))}
        </ul>
      )}
    </>
  ) : (
    <NotFound title="Your cart is empty!" />
  );
};

export { ShoppingList };
