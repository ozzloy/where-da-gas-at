import { ReviewContext } from "../../../context/UserReviewContext";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import ReviewFormModal from "../../ReviewFormModal/ReviewFormModal";
import DeletedReviewFormModal from "../../DeletedReviewFormModal/DeletedReviewFormModal";
import "./UserReviewDisplay.css";

export default function UserReviewsDisplay({ onReviewAdded }) {
  const { reviews, setReviews, loading, error } =
    useContext(ReviewContext);
  const sessionUser = useSelector((store) => store.session.user);
  const [station, setStation] = useState({});
  const { closeModal, setModalContent } = useModal();

  useEffect(() => {
    async function fetchStation() {
      const token = localStorage.getItem("token");
      const options = token
        ? {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        : undefined;
      const res = await fetch(`/api/station/`, options);
      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed to get stations");
      }
      setStation(data["station"]);
    }
    fetchStation();
  }, []);

  // handle sumbitted review in modal
  const handleSumbitReview = (newReview) => {
    onReviewAdded(newReview);
    closeModal();
  };

  // open the modal for writing a review
  const onReviewEdited = (review) => {
    setModalContent(
      <ReviewFormModal
        onClose={closeModal}
        stationId={review.station_id}
        onSubmitReview={handleSumbitReview}
        review={review}
      />,
    );
  };

  // handle for deleting a review
  const onReviewDeleted = (review_id) => {
    setModalContent(
      <DeletedReviewFormModal
        onDelete={() => deleteReview(review_id)}
        onClose={closeModal}
        type="Review"
      />,
    );
  };

  const deleteReview = async (review_id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/review/${review_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete review");
      }
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== review_id),
      );
    } catch (e) {
      console.error("Error deleting review", e);
    }
    closeModal();
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;
  if (reviews.length === 0) {
    return <p>No Review Yet</p>;
  }

  return (
    <div className="user-review-container">
      <h2>Reviewer: {sessionUser.name}</h2>
      <ul>
        {reviews
          .filter((review) => review.king_id === sessionUser.id)
          .map((review) => (
            <li key={review.id}>
              <p>
                Station:{" "}
                {review.station_id in station
                  ? station[review.station_id].name
                  : review.station_id}
              </p>
              <p>Review: {review.text}</p>
              <div>
                <button onClick={() => onReviewEdited(review)}>
                  Edit
                </button>
                <button onClick={() => onReviewDeleted(review.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
