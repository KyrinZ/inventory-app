import { useHistory } from "react-router-dom";

import styles from "./MenuItem.module.scss";

export default function MenuItem({ children, image, alt, path = "/" }) {
  let history = useHistory();

  return (
    <div
      onClick={() => {
        history.push(path);
      }}
      className={styles.menuItem}
    >
      <img src={image} alt={alt} />
      <p>{children}</p>
    </div>
  );
}
