// Components
import InventoryItem from "./InventoryItem";

// Styles
import styles from "./Inventory.module.scss";

const username = "TestUser";
const productItems = [
  {
    productId: 2134,
    productName: "Chair",
    dateAdded: "24 December",
    quantity: 30,
  },
  {
    productId: 342,
    productName: "Table",
    dateAdded: "25 December",
    quantity: 13,
  },
  {
    productId: 1323,
    productName: "Guitar",
    dateAdded: "30 November",
    quantity: 5,
  },
];

export default function Inventory() {
  return (
    <div>
      <div className={styles.headingContainer}>
        {/* Title */}
        <div>
          <h1>{username}'s inventory</h1>
        </div>

        {/* Search */}
        <div className={styles.search}>
          <input type="text" placeholder="Search Item..." />
        </div>
      </div>

      <div className={styles.buttons}>
        <button>Add Item</button>
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
        {productItems.length > 0
          ? productItems.map((items, index) => (
              <InventoryItem key={index} productNumber={index + 1} {...items} />
            ))
          : "No items added"}
      </div>
    </div>
  );
}
