import "./DeletePrice.css";

export default function DeletePriceModal({
  onDelete,
  onClose,
  type,
}) {
  return (
    <>
      <div className="delete-msg">
        <h2>Confirm Delete</h2>
        <em>Are you sure you want to delete this price?</em>
        <button className="delete-price" onClick={onDelete}>
          Yes(Delete {type})
        </button>
        <button onClick={onClose}>No(Keep {type})</button>
      </div>
    </>
  );
}
