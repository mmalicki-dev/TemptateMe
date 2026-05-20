import styles from "./IngredientsListHeader.module.css";

interface IngredientsListHeaderProps {
  isShoppingList?: boolean;
}

const IngredientsListHeader = ({
  isShoppingList = false,
}: IngredientsListHeaderProps) => {
  return (
    <div className={styles.IngredientsListHeader}>
      <div className={styles.name}>{isShoppingList ? "Name" : "Product"}</div>
      <div className={styles.numberList}>
        <span>Amount</span>
        <span>{isShoppingList ? "Remove" : "Add to list"}</span>
      </div>
    </div>
  );
};

export { IngredientsListHeader };
