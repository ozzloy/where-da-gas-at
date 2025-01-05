import { ReviewContext } from "../../../context/UserReviewContext";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./UserReviewDisplay.css";

export default function UserReviewsDisplay() {
  const { reviews, loading, error } = useContext(ReviewContext);
  const sessionUser = useSelector((store) => store.session.user);
  const [station, setStation] = useState({});

  useEffect(() => {
    async function fetchStation() {
      const res = await fetch(`/api/station/`);
      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        throw new Error("Failed to get stations");
      }
      setStation(data["station"]);
    }
    fetchStation();
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;
  if (reviews.length === 0) {
    return "no reivew";
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
            </li>
          ))}
      </ul>
    </div>
  );
}
