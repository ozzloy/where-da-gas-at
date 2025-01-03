import { ReviewContext } from "../../../context/UserReviewContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import "./UserReviewDisplay.css";

export default function UserReviewsDisplay() {
  const { reviews, loading, error } = useContext(ReviewContext);
  const sessionUser = useSelector((store) => store.session.user);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;
  if (reviews.length === 0) {
    return "no reivew";
  }

  return (
    <div>
      <h2>User Reviews</h2>
      <ul>
        {reviews // reviews
          .filter((review) => review.id === sessionUser.id)
          .map((review) => (
            <li key={review.id}>
              <p>{review.text}</p>
              <p>Station ID: {review.station_id}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
