import { ReviewContext } from "../../context/UserReviewContext";
import { useState, useContext, useEffect } from "react";
import "./ReviewForm.css";
import { useGetSelectedStation } from "../../hooks/useGetSelectedStation";

export default function ReviewFormModal({
  onClose,
  stationId,
  onSubmitReview,
  review = null,
}) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const stationInfo = useGetSelectedStation(stationId);
  const { setUpdate } = useContext(ReviewContext);

  useEffect(() => {
    if (review) {
      setText(review.text);
    }
  }, [review]);

  if (!stationInfo) return <h1>Loading Station Info</h1>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      station_id: stationInfo.id,
      text,
    };

    setLoading(true);

    try {
      let res;
      if (review) {
        // Update existing review with PUT method
        res = await fetch(`/api/review/${review.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReview),
        });
      } else {
        // Create new review with POST method
        res = await fetch("/api/review/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReview),
        });
      }

      if (!res.ok) {
        throw new Error("Failed to submit review");
      }

      const data = await res.json();
      onSubmitReview(data.review);
      onClose();
    } catch (e) {
      console.error("error ocuur on posting a review", e);
    } finally {
      setUpdate((prev) => !prev);
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
          {review ? "Edit Your Review" : "Submit Your Review"}
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
