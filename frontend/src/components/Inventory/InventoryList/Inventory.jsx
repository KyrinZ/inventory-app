import { useState, useEffect, useContext } from "react";

// Components
import {
  AddProductForm,
  InventoryItem,
  Search,
  DownloadReport,
} from "./components";

// Styles
import styles from "./Inventory.module.scss";

// Utilities
import { axios } from "../../utilities";
import { UserContext } from "../../EntryPoint";

export default function Inventory() {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [productItems, setProductItems] = useState({
    isItemsArrived: false,
    items: [],
  });
  const { userData } = useContext(UserContext);

  const loadProducts = async (search = "") => {
    try {
      const response = await axios.get(`product/?search=${search}`);
      setProductItems({ isItemsArrived: true, items: response.data });
    } catch (error) {
      setProductItems({ isItemsArrived: true, items: [] });
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div style={{ marginLeft: "10rem" }}>
      {isAddFormOpen ? (
        <AddProductForm
          loadProducts={loadProducts}
          setIsAddFormOpen={setIsAddFormOpen}
        />
      ) : null}

      <div className={styles.headingContainer}>
        {/* Title */}
        <div>
          <h1>{userData.username}'s inventory</h1>
        </div>

        {/* Search */}
        <Search loadProducts={loadProducts} />
      </div>

      <div className={styles.buttons}>
        <button onClick={() => setIsAddFormOpen(true)}>Add Item</button>
        <DownloadReport items={productItems.items} />
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
