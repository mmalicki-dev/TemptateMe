import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../redux/shopping/operations.ts";
import type { Ingredient } from "../../../types/index.ts";
import type { AppDispatch } from "../../../redux/store.ts";
import styles from "./ShoppingListItem.module.css";

interface ShoppingListItemProps {
  id: string;
  listItem: Ingredient | undefined;
  measure: string;
}

const ShoppingListItem = memo(({ id, listItem, measure }: ShoppingListItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = useCallback(() => {
    dispatch(deleteProduct({ id }));
  }, [dispatch, id]);

  return listItem ? (
    <li className={styles.ShoppingListItem}>
      <div className={styles.name}>
        <img alt={listItem.ttl} src={listItem.thb} className={styles.image} />
        <span>{listItem.ttl}</span>
      </div>
      <div className={styles.numberList}>
        <div className={styles.measure}>{measure}</div>
        <button type="button" onClick={handleDelete} className={styles.list}>
          X
        </button>
      </div>
    </li>
  ) : null;
});

export { ShoppingListItem };
