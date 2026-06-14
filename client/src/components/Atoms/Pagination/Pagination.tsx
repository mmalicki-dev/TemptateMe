import { useEffect } from "react";
import type { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ReactComponent as IconLeftArrow } from "./icon-left-arrow.svg";
import { ReactComponent as IconRightArrow } from "./icon-right-arrow.svg";
import { updatePage } from "../../../redux/recipes/operations.ts";
import { useRecipes } from "../../../hooks/index.ts";
import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import type { AppDispatch } from "../../../redux/store.ts";
import styles from "./Pagination.module.css";

const Pagination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pageAmount, page } = useRecipes();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDark } = useDarkMode();

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement;
    if (target.nodeName === "DIV") {
      dispatch(updatePage(Number(target.id)));
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: target.id,
      });
    }
  };

  const listItems = (count: number) => {
    const array = [];
    for (let i = 0; i <= count - 1; i++) {
      array.push(
        <div
          id={String(i)}
          key={i}
          className={[
            styles.number,
            i === page && styles.current,
            isDark && styles.isDark,
          ].join(" ")}
        >
          {i + 1}
        </div>,
      );
    }
    return array;
  };

  const onAdd = () => {
    if (page < pageAmount - 1) {
      dispatch(updatePage(page + 1));
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: String(page + 1),
      });
    }
  };

  const onSubtract = () => {
    if (page > 0) {
      dispatch(updatePage(page - 1));
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: String(page - 1),
      });
    }
  };

  useEffect(() => {
    dispatch(updatePage(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageAmount]);

  return pageAmount > 0 ? (
    <div className={[styles.Pagination, isDark && styles.isDark].join(" ")}>
      <button onClick={onSubtract} className={styles.arrows}>
        <IconLeftArrow />
      </button>
      <button onClick={onClick} className={styles.list}>
        {listItems(pageAmount)}
      </button>
      <button onClick={onAdd} className={styles.arrows}>
        <IconRightArrow />
      </button>
    </div>
  ) : null;
};

export { Pagination };
