import StarRating from "./StarRating";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import ReviewFormModal from "../../ReviewFormModal/ReviewFormModal";
import DeletedReviewFormModal from "../../DeletedReviewFormModal/DeletedReviewFormModal";
import { useModal } from "../../../context/Modal";
import "./ReviewsDisplay.css";
import { useContext } from "react";
import { ReviewContext } from "../../../context/UserReviewContext";

function ReviewsDisplay({ stationInfo, onReviewAdded }) {
  const { setModalContent, closeModal } = useModal();
  const { reviews, setReviews } = useContext(ReviewContext);

  const sessionUser = useSelector((store) => store.session.user);
  const userReview = reviews.find(
    (review) =>
      review.station_id === stationInfo.id &&
      review.king_id === sessionUser.id,
  );

  // handle sumbitted reivew in modal
  const handleSumbitReview = (newReview) => {
    onReviewAdded(newReview);
    closeModal();
  };

  // open the modal for writing a review
  const openCommentModal = (review = null) => {
    // setOnModalClose(() => closeModal);
    setModalContent(
      <ReviewFormModal
        onClose={closeModal}
        stationInfo={stationInfo}
        onSubmitReview={handleSumbitReview}
        review={review}
      />,
    );
  };

  // handle for deleting a reivew
  const handleDeletedModal = (review_id) => {
    setModalContent(
      <DeletedReviewFormModal
        onDelete={() => deleteReview(review_id)}
        onClose={closeModal}
        type="Review"
      />,
    );
  };

  const deleteReview = async (review_id) => {
    try {
      const res = await fetch(`/api/review/${review_id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete review");
      }
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== review_id),
      );
    } catch (e) {
      console.error("Error deleting reivew", e);
    }
    closeModal();
  };

  if (stationInfo && stationInfo.reviews && sessionUser) {
    return (
      <div className="reviews-container">
        <div className="user-info-display">
          {!userReview && (
            <span>
              <button onClick={() => openCommentModal()}>
                Write Your Review
              </button>
            </span>
          )}

          {reviews
            .filter((review) => review.station_id === stationInfo.id)
            .map((review) => (
              <li className="user-info-display" key={review.id}>
                <div className="name-icon-container">
                  <FaUser />
                  <p>{review.king_name}</p>
                </div>
                <p>{review.text}</p>

                {sessionUser.id === review.king_id && (
                  <>
                    <span>
                      <button
                        onClick={() => openCommentModal(review)}
                      >
                        Edit
                      </button>
                    </span>
                    <span>
                      <button
                        onClick={() => handleDeletedModal(review.id)}
                      >
                        Delete
                      </button>
                    </span>
                  </>
                )}
              </li>
            ))}

          {stationInfo.reviews.map((review, index) => (
            <div key={index} className="review-container">
              <div className="user-info-display">
                <div className="name-icon-container">
                  <FaUser />
                  <p>{review.authorAttribution.displayName}</p>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p>{review.originalText.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

export default ReviewsDisplay;
