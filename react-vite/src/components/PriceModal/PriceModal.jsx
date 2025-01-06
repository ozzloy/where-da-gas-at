import { PriceContext } from "../../context/PriceContext";
import { useState, useContext, useEffect } from "react";
import "./Price.css";
import { useGetSelectedStation } from "../../hooks/useGetSelectedStation";

export default function PriceModal({
  onClose,
  stationId,
  onSubmitPrice,
  price = null,
}) {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const stationInfo = useGetSelectedStation(stationId);
  const { setUpdate } = useContext(PriceContext);

  useEffect(() => {
    if (price) {
      setAmount(price.price);
    }
  }, [price]);

  if (!stationInfo) return <h1>Loading Station Info</h1>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPrice = {
      station_id: stationId,
      price: amount,
      fuel_type: "unleaded",
    };

    setLoading(true);

    try {
      const method = price ? "PUT" : "POST";
      const path = "/api/price/" + (price ? `${price.id}` : "");
      const res = await fetch(path, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPrice),
      });

      if (!res.ok) {
        throw new Error("Failed to submit review");
      }
      const data = await res.json();
      onSubmitPrice(data.price);
      onClose();
    } catch (e) {
      console.error("error ocuur on posting a price", e);
    } finally {
      setUpdate((update) => !update);
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="price-modal">
          <h1>
            What is the price of unleaded fuel at{" "}
            {stationInfo.displayName.text || "this station"} ?{" "}
          </h1>
          <input
            type="number"
            value={amount}
            placeholder="Leave your fuel price here..."
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button
          className="submit-btn"
          type="submit"
          disabled={amount <= 0 || loading}
        >
          {price ? "Edit Your Price" : "Submit Your Price"}
        </button>
      </form>
      <button
        className="submit-btn"
        onClick={onClose}
        disabled={loading}
      >
        Close
      </button>
    </>
  );
}
