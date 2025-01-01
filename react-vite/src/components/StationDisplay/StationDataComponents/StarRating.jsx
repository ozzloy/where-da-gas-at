import { FaStar } from "react-icons/fa";

const Star = ({ filled }) => {
  return <FaStar color={filled ? "gold" : "lightgray"} />;
};

const StarRating = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => (
        <Star key={index} filled={index < rating} />
      ))}
    </div>
  );
};

export default StarRating;
