import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../redux/shopping/operations.ts";
import type { Ingredient } from "../../../types/index.ts";
import type { AppDispatch } from "../../../redux/store.ts";
import styles from "./ShoppingListItem.module.css";

interface ShoppingListItemProps {
  id: string;
  listItem: Ingredient;
  measure: string;
}

const ShoppingListItem = ({ id, listItem, measure }: ShoppingListItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  return listItem ? (
    <li className={styles.ShoppingListItem}>
      <div className={styles.name}>
        <img alt={listItem.ttl} src={listItem.thb} className={styles.image} />
        <span>{listItem.ttl}</span>
      </div>
      <div className={styles.numberList}>
        <div className={styles.measure}>{measure}</div>
        <button
          type="button"
          onClick={() => dispatch(deleteProduct({ id }))}
          className={styles.list}
        >
          X
        </button>
      </div>
    </li>
  ) : null;
};

export { ShoppingListItem };
