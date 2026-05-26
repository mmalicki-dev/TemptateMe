import styles from "./ShoppingList.module.css";
import { ShoppingListItem } from "../../Molecules/ShoppingListItem/ShoppingListItem.tsx";
import { useIngredients, useShopping } from "../../../hooks/index.ts";
import { NotFound } from "../../Atoms/NotFound/NotFound.tsx";
import { Loader } from "../../Atoms/Loader/Loader.tsx";
import type { ShoppingItem } from "../../../types/index.ts";

const ShoppingList = () => {
  const { shoppingList, isLoading } = useShopping();
  const { ingredients } = useIngredients();

  if (isLoading) return <Loader />;
  if (shoppingList.length <= 0) return <NotFound title="Your cart is empty!" />;

  const groups = shoppingList.reduce<Record<string, ShoppingItem[]>>((acc, item) => {
    const key = item.recipeName ?? "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <>
      <div className={styles.head}>
        <span>Product</span>
        <div className={styles.numberList}>
          <span>Number</span>
          <span>Remove</span>
        </div>
      </div>
      {ingredients && Object.entries(groups).map(([recipeName, items]) => (
        <div key={recipeName} className={styles.recipeGroup}>
          <p className={styles.recipeGroupTitle}>{recipeName}</p>
          <ul className={styles.ShoppingList}>
            {items.map((item) => (
              <ShoppingListItem
                key={item._id}
                id={item._id}
                listItem={ingredients.find((ing) => ing._id === item.ingredientId)}
                measure={item.measure}
              />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export { ShoppingList };
