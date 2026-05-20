import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import { ReactComponent as SearchIcon } from "./icon-search.svg";

interface NavigationProps {
  isFooter?: boolean;
}

const Navigation = ({ isFooter = false }: NavigationProps) => {
  return (
    <ul className={isFooter ? styles.NavFooter : styles.NavHeader}>
      <li>
        <NavLink
          to="/categories"
          className={({ isActive }) => isActive ? `${styles.links} ${styles.Active}` : styles.links}
        >
          Categories
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/addRecipe"
          className={({ isActive }) => isActive ? `${styles.links} ${styles.Active}` : styles.links}
        >
          Add recipes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myRecipes"
          className={({ isActive }) => isActive ? `${styles.links} ${styles.Active}` : styles.links}
        >
          My recipes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/favorites"
          className={({ isActive }) => isActive ? `${styles.links} ${styles.Active}` : styles.links}
        >
          Favorites
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shopping"
          className={({ isActive }) => isActive ? `${styles.links} ${styles.Active}` : styles.links}
        >
          Shopping list
        </NavLink>
      </li>
      {!isFooter && (
        <li>
          <NavLink
            to="/searchRecipes"
            className={({ isActive }) => isActive ? `${styles.links} ${styles.Active}` : styles.links}
          >
            <SearchIcon />
            <span className={styles.searchText}>Search</span>
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export { Navigation };
