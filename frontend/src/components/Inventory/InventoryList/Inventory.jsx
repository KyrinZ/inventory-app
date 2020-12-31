import { useState, useEffect, useCallback } from "react";

// Components
import { AddProductForm, InventoryItem, Search } from "./components";

// Styles
import styles from "./Inventory.module.scss";

// Utilities
import { axios } from "../../utilities";

const username = "TestUser";

export default function Inventory() {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [productItems, setProductItems] = useState({
    isItemsArrived: false,
    items: [],
  });

  const loadProducts = useCallback((search = "") => {
    axios
      .get(`product/?search=${search}`)
      .then(({ data }) => {
        setProductItems({ isItemsArrived: true, items: data });
      })
      .catch((err) => {
        setProductItems({ isItemsArrived: true, items: [] });
      });
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div>
      {isAddFormOpen ? (
        <AddProductForm
          loadProducts={loadProducts}
          setIsAddFormOpen={setIsAddFormOpen}
        />
      ) : null}

      <div className={styles.headingContainer}>
        {/* Title */}
        <div>
          <h1>{username}'s inventory</h1>
        </div>

        {/* Search */}
        <Search loadProducts={loadProducts} />
      </div>

      <div className={styles.buttons}>
        <button onClick={() => setIsAddFormOpen(true)}>Add Item</button>
        <button>Download Report</button>
      </div>

      <div className={styles.productsContainer}>
        {/* Table Head */}
        <div className={styles.productsHeading}>
          <div>
            <div>No.</div>
          </div>
          <div>
            <div>Product id</div>
          </div>
          <div>
            <div>Product name</div>
          </div>
          <div>
            <div>Date added</div>
          </div>
          <div>
            <div>Quantity</div>
          </div>
        </div>
        {productItems.isItemsArrived ? (
          productItems.items.length > 0 ? (
            productItems.items.map((items, index) => (
              <InventoryItem
                key={index}
                productNumber={index + 1}
                loadProducts={loadProducts}
                {...items}
              />
            ))
          ) : (
            <p>No items added</p>
          )
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
}
