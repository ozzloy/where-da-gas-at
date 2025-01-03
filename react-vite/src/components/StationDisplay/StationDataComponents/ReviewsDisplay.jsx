import StarRating from "./StarRating";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import ReviewFormModal from "../../ReviewFormModal/ReviewFormModal";
import { useModal } from "../../../context/Modal";
import "./ReviewsDisplay.css";
import { useContext } from "react";
import { ReviewContext } from "../../../context/UserReviewContext";
// import { GoogleMapContext } from "../../../context/GoogleMapContext";

function ReviewsDisplay({ stationInfo, onReviewAdded }) {
  const { setModalContent, setOnModalClose, closeModal } = useModal();

  const sessionUser = useSelector((store) => store.session.user);
  const { reviews } = useContext(ReviewContext);
  // const { selectedStation } = useContext(GoogleMapContext);

  // console.log("what does stationInfor show", stationInfo);

  // console.log("what does reivew show", reviews);

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
        <div className="user-info-display">
          {reviews
            .filter((review) => review.station_id === stationInfo.id)
            .map((review) => (
              <li className="user-info-display" key={review.id}>
                <div className="name-icon-container">
                  <FaUser />
                  <p>{review.king_name}</p>
                </div>
                <p>{review.text}</p>
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
