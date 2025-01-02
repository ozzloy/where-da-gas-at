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
  return (
    <div>
      <h2>User Reviews</h2>
      <ul>
        {texts &&
          texts.text
            .filter((review) => review.id === sessionUser.id)
            .map((text) => (
              <li key={text.id}>
                <p>{text.text}</p>
                <p>Station ID: {text.station_id}</p>
              </li>
            ))}
      </ul>
    </div>
  );
}
