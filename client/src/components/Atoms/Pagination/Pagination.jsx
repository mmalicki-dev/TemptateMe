import styles from "./Pagination.module.css";
import { useRecipes } from "../../../hooks/index.js";
import { useSearchParams } from "react-router-dom";
import { ReactComponent as IconLeftArrow } from "./icon-left-arrow.svg";
import { ReactComponent as IconRightArrow } from "./icon-right-arrow.svg";
import { useDispatch } from "react-redux";
import { updatePage } from "../../../redux/recipes/operations.js";
import { useEffect } from "react";
import { useDarkMode } from "../../../context/DarkModeContext.jsx";

const Pagination = () => {
  const dispatch = useDispatch();
  const { pageAmount, page } = useRecipes();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDark } = useDarkMode();

  const onClick = (event) => {
    if (event.target.nodeName === "LI") {
      dispatch(updatePage(Number(event.target.id)));
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        page: event.target.id,
      });
    }
  };

  const listItems = (pageAmount) => {
    const array = [];
    for (let i = 0; i <= pageAmount - 1; i++) {
      array.push(
        <li
          id={i}
          key={i}
          className={[
            styles.number,
            i === page && styles.current,
            isDark && styles.isDark,
          ].join(" ")}
        >
          {i + 1}
        </li>
      );
    }
    return array;
  };

  const onAdd = () => {
    if (page < pageAmount - 1) {
      dispatch(updatePage(page + 1));
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        page: page + 1,
      });
    }
  };

  const onSubstrack = () => {
    if (page > 0) {
      dispatch(updatePage(Number(page - 1)));
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        page: page - 1,
      });
    }
  };

  function clearPageNumber() {
    dispatch(updatePage(0));
  }

  useEffect(() => {
    clearPageNumber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageAmount]);

  return (
    pageAmount && (
      <div className={[styles.Pagination, isDark && styles.isDark].join(" ")}>
        <button onClick={onSubstrack} className={styles.arrows}>
          <IconLeftArrow />
        </button>
        <ul onClick={onClick} className={styles.list}>
          {listItems(pageAmount)}
        </ul>
        <button onClick={onAdd} className={styles.arrows}>
          <IconRightArrow />
        </button>
      </div>
    )
  );
};

export { Pagination };
