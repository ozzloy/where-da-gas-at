import { createContext, useState, useEffect } from "react";
export const ReviewContext = createContext();

export default function ReviewStationProvider({ children }) {
  const [texts, setText] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const res = await fetch("/api/review");
        const data = await res.json();
        console.log("what is my data shows", data);
        if (!res.ok) {
          throw new Error("Failed to fetch reviews");
        }
        setText(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTexts();
  }, []);

  return (
    <>
      <ReviewContext.Provider value={{ texts, loading, error }}>
        {children}
      </ReviewContext.Provider>
    </>
  );
}
