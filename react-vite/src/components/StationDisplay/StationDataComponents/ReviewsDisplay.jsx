import StarRating from "./StarRating";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import ReviewFormModal from "../../ReviewFormModal/ReviewFormModal";
import { useModal } from "../../../context/Modal";
import "./ReviewsDisplay.css";

function ReviewsDisplay({ stationInfo, onReviewAdded }) {
  const { setModalContent, setOnModalClose, closeModal } = useModal();

  const sessionUser = useSelector((store) => store.session.user);

  const handleSumbitReview = (newReview) => {
    onReviewAdded(newReview);
    closeModal();
  };

  const openCommentModal = () => {
    setOnModalClose(() => closeModal);
    setModalContent(
      <ReviewFormModal
        onClose={closeModal}
        stationInfo={stationInfo}
        onSubmitReview={handleSumbitReview}
      />,
    );
  };

  if (stationInfo && stationInfo.reviews && sessionUser) {
    return (
      <div className="reviews-container">
        <button onClick={openCommentModal}>Write a Review</button>
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
    );
  }
  return null;
}

export default ReviewsDisplay;
