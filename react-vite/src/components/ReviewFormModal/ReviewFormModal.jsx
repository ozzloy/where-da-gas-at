import { useState } from "react";
import "./ReviewForm.css";

export default function ReviewFormModal({
  onClose,
  stationInfo,
  onSubmitReview,
}) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  if (!stationInfo) return <h1>Loading...</h1>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newText = {
      station_id: stationInfo.id,
      text,
    };

    setLoading(true);

    try {
      // Correct the fetch request syntax
      const res = await fetch("/api/review/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newText),
      });

      if (!res.ok) {
        throw new Error("Failed to submit review");
      }

      const data = await res.json();
      onSubmitReview(data.review);
      onClose();
    } catch (e) {
      console.error("error ocuur on posting a review", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="review-modal">
          <h1>
            How do you feel about{" "}
            {stationInfo.displayName.text || "this station"} ?{" "}
          </h1>
          <textarea
            value={text}
            placeholder="Leave your review here..."
            style={{ minWidth: "300px", minHeight: "200px" }}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <button
          className="submit-btn"
          type="submit"
          disabled={text.length <= 0 || loading}
        >
          Submit Your Review
        </button>
      </form>
      <button
        className="submit-btn"
        onClick={onClose}
        disabled={loading}
      >
        Close
      </button>
    </>
  );
}
