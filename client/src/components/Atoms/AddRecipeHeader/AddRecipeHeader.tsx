import type { ReactNode } from "react";
import styles from "./AddRecipeHeader.module.css";

interface AddRecipeHeaderProps {
  children: ReactNode;
}

const AddRecipeHeader = ({ children }: AddRecipeHeaderProps) => {
  return <h1 className={styles.formHeader}>{children}</h1>;
};

export { AddRecipeHeader };
