import "./DeletedReviewFormModal.css";

export default function DeletedReviewFormModal({
  onDelete,
  onClose,
  type,
}) {
  return (
    <>
      <div className="delete-msg">
        <h2>Confirm Delete</h2>
        <em>Are you sure you want to delete this review?</em>
        <button className="delete-review" onClick={onDelete}>
          Yes(Delete {type})
        </button>
        <button onClick={onClose}>No(Keep {type})</button>
      </div>
    </>
  );
}
