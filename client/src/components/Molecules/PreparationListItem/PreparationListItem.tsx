import styles from "./PreparationListItem.module.css";

interface PreparationListItemProps {
  stepNumber: number;
  step: string;
}

const PreparationListItem = ({ stepNumber, step }: PreparationListItemProps) => {
  return (
    <li className={styles.PreparationListItem}>
      <div className={styles.number}>{stepNumber}</div>
      <div className={styles.step}>{step}</div>
    </li>
  );
};

export { PreparationListItem };
