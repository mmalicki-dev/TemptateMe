import { useDarkMode } from "../../../context/DarkModeContext.tsx";
import styles from "./AddDropdownList.module.css";

interface DropdownItem {
  _id?: string;
  ttl?: string;
  title?: string;
}

interface AddDropdownListProps {
  array: (DropdownItem | string)[];
  filter?: string;
  isCentered?: boolean;
  onItemClick: (event: React.MouseEvent<HTMLElement>) => void;
  sendDataToParent?: (value: string) => void;
}

const getLabel = (item: DropdownItem | string): string => {
  if (typeof item === "string") return item;
  return item.ttl ?? item.title ?? "";
};

const getValue = (item: DropdownItem | string): string => {
  if (typeof item === "string") return item;
  return item._id ?? item.title ?? item.ttl ?? "";
};

const matchesFilter = (item: DropdownItem | string, filter: string): boolean => {
  if (typeof item === "string") return item.toLowerCase().includes(filter.toLowerCase());
  return !item.ttl || item.ttl.toLowerCase().includes(filter.toLowerCase());
};

const AddDropdownList = ({
  array,
  filter = "",
  isCentered = false,
  onItemClick,
  sendDataToParent,
}: AddDropdownListProps) => {
  const { isDark } = useDarkMode();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onItemClick(event);
    sendDataToParent?.(event.currentTarget.dataset.id ?? "");
  };

  return (
    <div
      className={[styles.AddDropdownList, isDark && styles.isDark].join(" ")}
      data-scroll=""
    >
      <ul className={styles.list} data-scroll="">
        {array
          .filter((item) => matchesFilter(item, filter))
          .map((item) => (
            <li key={getValue(item)} data-scroll="">
              <button
                type="button"
                className={[
                  styles.listItem,
                  isCentered && styles.isCentered,
                  isDark && styles.isDark,
                ].join(" ")}
                onClick={handleClick}
                data-value={getLabel(item)}
                data-id={getValue(item)}
                data-scroll=""
              >
                {getLabel(item)}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export { AddDropdownList };
