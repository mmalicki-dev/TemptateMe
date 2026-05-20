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
  onItemClick: (event: React.MouseEvent<HTMLLIElement>) => void;
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

const AddDropdownList = ({
  array,
  filter = "",
  isCentered = false,
  onItemClick,
  sendDataToParent = () => {},
}: AddDropdownListProps) => {
  const { isDark } = useDarkMode();
  return (
    <div
      className={[styles.AddDropdownList, isDark && styles.isDark].join(" ")}
      data-scroll=""
    >
      <ul className={styles.list} data-scroll="">
        {array
          .filter((item) =>
            typeof item === "string"
              ? item.toLowerCase().includes(filter.toLowerCase())
              : item.ttl
                ? item.ttl.toLowerCase().includes(filter.toLowerCase())
                : true,
          )
          .map((item, index) => (
            <li
              key={index}
              className={[
                styles.listItem,
                isCentered && styles.isCentered,
                isDark && styles.isDark,
              ].join(" ")}
              onClick={(event) => {
                onItemClick(event);
                sendDataToParent(getValue(item));
              }}
              data-value={getLabel(item)}
              data-scroll=""
            >
              {getLabel(item)}
            </li>
          ))}
      </ul>
    </div>
  );
};

export { AddDropdownList };
