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
    <div className={styles.container}>
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

      <div className={styles.outerTable}>
        <table className={styles.productsContainer}>
          {/* Table Head */}
          <thead className={styles.productsHeading}>
            <tr>
              <th>
                <p>No.</p>
              </th>
              <th>
                <p>Product id</p>
              </th>
              <th>
                <p>Product name</p>
              </th>
              <th>
                <p>Quantity</p>
              </th>
            </tr>
          </thead>
          <tbody>
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
                <tr>
                  <td>No items added</td>
                </tr>
              )
            ) : (
              <tr>
                <td>Loading</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
