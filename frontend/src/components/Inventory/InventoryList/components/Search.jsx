import { useState } from "react";

// Styles
import styles from "./styles/Search.module.scss";

export default function Search({ loadProducts }) {
  const [search, setSearch] = useState("");

  const handleSearchChange = async (event) => {
    setSearch((prevValue) => {
      loadProducts(event.target.value);
      return event.target.value;
    });
  };

  return (
    <div className={styles.search}>
      <input
        onChange={handleSearchChange}
        defaultValue={search}
        type="text"
        placeholder="Search Item..."
      />
    </div>
  );
}
