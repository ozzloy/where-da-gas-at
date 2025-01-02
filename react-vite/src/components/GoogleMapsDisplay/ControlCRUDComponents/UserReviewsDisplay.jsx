import { ReviewContext } from "../../../context/UserReviewContext";
import { useContext } from "react";
import { useSelector } from "react-redux";

export default function UserReviewsDisplay() {
  const { texts, loading, error } = useContext(ReviewContext);
  const sessionUser = useSelector((store) => store.session.user);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;
  if (texts.length === 0) {
    return "no reivew";
  }

  // console.log("what is texts show here!!!!", texts);
  return (
    <div>
      <h2>User Reviews</h2>
      <ul>
        {texts // reviews
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
