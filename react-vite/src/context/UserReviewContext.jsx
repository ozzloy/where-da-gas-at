import { createContext, useState, useEffect } from "react";
export const ReviewContext = createContext();

export default function ReviewStationProvider({ children }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState(false);

  const contextValues = {
    reviews,
    setReviews,
    loading,
    setLoading,
    error,
    setError,
    update,
    setUpdate,
  };

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const res = await fetch("/api/review");
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Failed to fetch reviews");
        }
        setReviews(Object.values(data.review));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTexts();
  }, [update]);

  return (
    <>
      <ReviewContext.Provider value={contextValues}>
        {children}
      </ReviewContext.Provider>
    </>
  );
}
