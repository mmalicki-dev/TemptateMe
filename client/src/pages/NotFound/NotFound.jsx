import styles from "./NotFound.module.css";
import image from "../../images/not_found_page.png";
import { Helmet } from "react-helmet-async";

const NotFoundPage = () => {
  return (
    <div className={styles.NotFoundPage}>
      <Helmet>
        <title>Not found</title>
      </Helmet>
      <div className={styles.container}>
        <img src={image} alt="Page not found" className={styles.image} />
        <span className={styles.sorry}>We're sorry,</span>
        <span className={styles.text}>
          but the page you were looking for can't be found
        </span>
      </div>
    </div>
  );
};

export { NotFoundPage };
