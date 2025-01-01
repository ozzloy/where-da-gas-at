import StarRating from "./StarRating";
import { FaUser } from "react-icons/fa";
import "./ReviewsDisplay.css";

function ReviewsDisplay({ stationInfo }) {
  if (stationInfo && stationInfo.reviews) {
    return (
      <div className="reviews-container">
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
