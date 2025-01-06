import { createContext, useState, useEffect } from "react";

export const PriceContext = createContext();
export default function PriceProvider({ children }) {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState(false);

  const contextValues = {
    prices,
    setPrices,
    loading,
    setLoading,
    error,
    setError,
    update,
    setUpdate,
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("/api/price/");
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Failed to fetch prices");
        }
        setPrices(Object.values(data.price));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, [update]);

  return (
    <PriceContext.Provider value={contextValues}>
      {children}
    </PriceContext.Provider>
  );
}
