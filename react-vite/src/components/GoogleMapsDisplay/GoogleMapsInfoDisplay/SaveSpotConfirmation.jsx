import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { GoogleMapContext } from "../../../context/GoogleMapContext";
import { useModal } from "../../../context/Modal";
import { MdImageNotSupported } from "react-icons/md";
import { useGoogleFetchPhoto } from "../../../hooks/useGoogleFetchPhoto";
import "./SaveSpotConfirmation.css";
// import { useNavigate } from "react-router-dom";

function SaveSpotConfirmation() {
  const { closeModal } = useModal();
  const { selectedStation } = useContext(GoogleMapContext);
  const photoUrl = useGoogleFetchPhoto();
  const sessionUser = useSelector((store) => store.session.user);
  const [message, setMessage] = useState(null);
  // const navigate = useNavigate();

  const handleSave = async () => {
    if (!sessionUser || !sessionUser.saved_stations) {
      console.log("User must be signed in to save a station");
      return;
    }

    try {
      const res = await fetch(`/api/station/${selectedStation.id}`);
      console.log(res);
      if (res.status === 403 || res.status === 404) {
        console.log("Station does not exist");
      } else {
        setMessage("Station is already saved");
        return;
      }
    } catch (err) {
      console.error("Failed to save station:", err);
    }

    try {
      const response = await fetch(
        `/api/station/${String(selectedStation.id)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedStation),
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setMessage(
        `Station saved successfully: ${selectedStation.displayName.text}`,
      );
    } catch (err) {
      console.error("Failed to save station:", err);
    }
  };

  console.log(message);

  if (message) {
    return (
      <div className="modal-body">
        <h3 className="modal-question">{message}</h3>
        <button className="button-design" onClick={closeModal}>
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="modal-body">
      <h3 className="modal-question">
        Are you sure you want to save this station?
      </h3>
      <div className="station-data-display">
        <h3>{selectedStation.displayName.text}</h3>
        <p>{selectedStation.formattedAddress}</p>
        {selectedStation &&
        selectedStation.photos &&
        selectedStation?.photos.length > 0 ? (
          <img
            className="image"
            src={photoUrl[0]}
            alt={`${selectedStation.displayName.text} image`}
          />
        ) : (
          <div className="image">
            <MdImageNotSupported />
          </div>
        )}
      </div>
      <div className="button-container">
        <button className="button-design" onClick={handleSave}>
          Save
        </button>
        <button className="button-design" onClick={closeModal}>
          Nahh I&apos;m good
        </button>
      </div>
    </div>
  );
}

export default SaveSpotConfirmation;
