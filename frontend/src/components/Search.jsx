import { useState, useEffect } from "react";

// Styles
import styles from "./Search.module.scss";

export default function Search({ loadProducts }) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    loadProducts(search);
  }, [search, loadProducts]);

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
