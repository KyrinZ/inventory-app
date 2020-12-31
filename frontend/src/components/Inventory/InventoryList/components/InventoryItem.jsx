import { useState } from "react";

// Styles
import styles from "./styles/InventoryItem.module.scss";

// Utilities
import { axios } from "../../../utilities/";

export default function InventoryItem({
  _id,
  productNumber,
  productId,
  productName,
  dateAdded,
  quantity = 0,
  loadProducts,
}) {
  const [stateQuantity, setStateQuantity] = useState(quantity);

  const deleteProduct = () => {
    axios
      .delete(`product/delete/${_id}/`)
      .then(() => {
        loadProducts();
      })
      .catch((err) => console.log(err));
  };

  const updateQuantity = (count = 0) => {
    axios
      .put(`product/update/${_id}/`, {
        productId,
        productName,
        quantity: stateQuantity + count,
      })
      .then(() => {
        setStateQuantity(stateQuantity + count);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.productContianer}>
      <div>{productNumber}</div>
      <div>{productId}</div>
      <div>{productName}</div>
      <div>{dateAdded}</div>
      <div className={styles.quantity}>
        <button
          onClick={() => {
            updateQuantity(1);
          }}
          className={styles.add}
        >
          +
        </button>
        <p>{stateQuantity}</p>
        <button
          onClick={() => {
            updateQuantity(-1);
          }}
        >
          -
        </button>
        <button onClick={deleteProduct}>Delete</button>
      </div>
    </div>
  );
}
