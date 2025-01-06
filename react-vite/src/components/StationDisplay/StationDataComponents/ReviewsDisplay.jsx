import StarRating from "./StarRating";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import DeletePriceModal from "../../DeletePriceModal";
import ReviewFormModal from "../../ReviewFormModal/ReviewFormModal";
import DeletedReviewFormModal from "../../DeletedReviewFormModal/DeletedReviewFormModal";
import { useModal } from "../../../context/Modal";
import "./ReviewsDisplay.css";
import { useContext } from "react";
import { ReviewContext } from "../../../context/UserReviewContext";
import PriceModal from "../../PriceModal/PriceModal";
import { PriceContext } from "../../../context/PriceContext";

function ReviewsDisplay({
  stationInfo,
  onReviewAdded,
  onPriceAdded,
}) {
  const { setModalContent, closeModal } = useModal();
  const { reviews, setReviews } = useContext(ReviewContext);
  const { prices, setPrices } = useContext(PriceContext);

  const sessionUser = useSelector((store) => store.session.user);

  // handle sumbitted reivew in modal
  const handleSumbitReview = (newReview) => {
    onReviewAdded(newReview);
    closeModal();
  };

  // handle sumbitted price in modal
  const handleSubmitPrice = (newPrice) => {
    onPriceAdded(newPrice);
    closeModal();
  };

  // open the modal for writing a review
  const openCommentModal = (review = null) => {
    setModalContent(
      <ReviewFormModal
        onClose={closeModal}
        stationId={stationInfo.id}
        onSubmitReview={handleSumbitReview}
        review={review}
      />,
    );
  };

  // open the modal for writing a price
  const openPriceModal = (price = null) => {
    setModalContent(
      <PriceModal
        onClose={closeModal}
        stationId={stationInfo.id}
        onSubmitPrice={handleSubmitPrice}
        price={price}
      />,
    );
  };

  // handle for deleting a reivew
  const handleDeletedModal = (review_id) => {
    setModalContent(
      <DeletedReviewFormModal
        onDelete={() => deletedReview(review_id)}
        onClose={closeModal}
        type="Review"
      />,
    );
  };

  // handle for deleting a price
  const handleDeletedPrice = (price_id) => {
    setModalContent(
      <DeletePriceModal
        onDelete={() => deletedPrice(price_id)}
        onClose={closeModal}
        type="Price"
      />,
    );
  };

  // for review
  const deletedReview = async (review_id) => {
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

  const deletedPrice = async (price_id) => {
    try {
      const res = await fetch(`/api/price/${price_id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete price");
      }
      setPrices((prevPrices) =>
        prevPrices.filter((price) => price.id !== price_id),
      );
    } catch (e) {
      console.error("Error deleting price", e);
    }
    closeModal();
  };

  if (stationInfo && stationInfo.reviews && sessionUser) {
    return (
      <div className="reviews-container">
        <div className="user-info-display">
          <span>
            <button onClick={() => openCommentModal()}>
              Write Your Review
            </button>
          </span>
          <span>
            <button onClick={() => openPriceModal()}>
              Set Your Price
            </button>
          </span>

          {prices
            .filter((price) => price.station_id === stationInfo.id)
            .map((price) => (
              <li className="user-info-display" key={price.id}>
                <div className="name-icon-container">
                  <FaUser />
                  <p>{price.king_name}</p>
                </div>
                <p>${price.price.toFixed(2)}</p>

                {sessionUser.id === price.king_id && (
                  <>
                    <span>
                      <button onClick={() => openPriceModal(price)}>
                        Edit
                      </button>
                    </span>
                    <span>
                      <button
                        onClick={() => handleDeletedPrice(price.id)}
                      >
                        Delete
                      </button>
                    </span>
                  </>
                )}
              </li>
            ))}
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
