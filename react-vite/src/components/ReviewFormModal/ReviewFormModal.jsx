import { useState, useContext, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { GoogleMapContext } from "../../context/GoogleMapContext";
import { useGetSelectedStation } from "../../hooks/useGetSelectedStation";
import "./ReviewFormModal.css";

export default function ReviewFormModal({ id }) {
  const { setSelectedStation } = useContext(GoogleMapContext);
  const stationInfo = useGetSelectedStation({ id });
  //   const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [text, setText] = useState("");

  useEffect(() => {
    if (stationInfo) {
      setSelectedStation(stationInfo);
    }
  }, [stationInfo, setSelectedStation]);

  if (!stationInfo) return <h1>Loading...</h1>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newText = { text };
    // still writing the context component
    console.log(newText);

    closeModal();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="review-container">
          <h1>
            How do you feel about{" "}
            {stationInfo.displayName.text || "this station"} ?{" "}
          </h1>
          <textarea
            value={text}
            placeholder="Leave your review here..."
            style={{ minWidth: "300px", minHeight: "200px" }}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button
          className="submit-btn"
          type="submit"
          disabled={text.length <= 0}
        >
          Sumbit Your Review
        </button>
      </form>
    </>
  );
}
