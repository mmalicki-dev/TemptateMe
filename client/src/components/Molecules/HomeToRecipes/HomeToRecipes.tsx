import { Link } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "./icon-arrow.svg";
import styles from "./HomeToRecipes.module.css";

const HomeToRecipes = () => {
  return (
    <div className={styles.HomeToRecipes}>
      <div className={styles.toRecipes}>
        <span className={styles.text}>
          <span className={styles.greenText}>Delicious and healthy way</span> to
          enjoy a variety of fresh ingredients in one satisfying meal
        </span>
        <Link to="/searchRecipes" className={styles.link}>
          See recipes{" "}
          <div className={styles.icon}>
            <ArrowIcon />
          </div>
        </Link>
      </div>
    </div>
  );
};

export { HomeToRecipes };
