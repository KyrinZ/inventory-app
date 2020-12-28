export default function InventoryItem({
  productNumber,
  productId,
  productName,
  dateAdded,
  quantity,
}) {
  return (
    <div>
      <div>{productNumber}</div>
      <div>{productId}</div>
      <div>{productName}</div>
      <div>{dateAdded}</div>
      <div>
        <button>+</button>
        <div>{quantity}</div>
        <button>-</button>
      </div>
    </div>
  );
}
