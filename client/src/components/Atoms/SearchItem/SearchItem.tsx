import { Link } from "react-router-dom";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import styles from "./SearchItem.module.css";

interface SearchItemProps {
  id: string;
  title: string;
  imgSrc: string;
}

const SearchItem = ({ id, title, imgSrc }: SearchItemProps) => {
  const { isDark } = useDarkMode();
  return (
    <Link to={`/recipe/${id}`}>
      <div className={styles.SearchItem}>
        <span className={[styles.title, isDark && styles.isDark].join(" ")}>
          {title}
        </span>
        <img src={imgSrc} alt={title} className={styles.image} />
      </div>
    </Link>
  );
};

export { SearchItem };
