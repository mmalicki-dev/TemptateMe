import styles from "./ShoppingList.module.css";
import { ShoppingListItem } from "../../Molecules/ShoppingListItem/ShoppingListItem.tsx";
import { useIngredients, useShopping } from "../../../hooks/index.ts";
import { NotFound } from "../../Atoms/NotFound/NotFound.tsx";
import { Loader } from "../../Atoms/Loader/Loader.tsx";

const ShoppingList = () => {
  const { shoppingList, isLoading } = useShopping();
  const { ingredients } = useIngredients();

  if (isLoading) return <Loader />;
  if (shoppingList.length <= 0) return <NotFound title="Your cart is empty!" />;

  return (
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
              listItem={ingredients.find(
                (ing) => ing._id === item.ingredientId,
              )}
              measure={item.measure}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export { ShoppingList };
