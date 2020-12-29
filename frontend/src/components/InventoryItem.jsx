// Styles
import styles from "./InventoryItem.module.scss";

export default function InventoryItem({
  productNumber,
  productId,
  productName,
  dateAdded,
  quantity,
}) {
  return (
    <div className={styles.productContianer}>
      <div>{productNumber}</div>
      <div>{productId}</div>
      <div>{productName}</div>
      <div>{dateAdded}</div>
      <div className={styles.quantity}>
        <button className={styles.add}>+</button>
        <p>{quantity}</p>
        <button>-</button>
      </div>
    </div>
  );
}
