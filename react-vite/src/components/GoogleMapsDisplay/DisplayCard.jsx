import { NavLink } from "react-router-dom";
import { MdImageNotSupported } from "react-icons/md";
import { useModal } from "../../context/Modal";
import "./DisplayCard.css";

function DisplayCard({ selectedStation, photoUrl }) {
  const { closeModal } = useModal();
  return (
    <div className="info-window-display">
      <h3>{selectedStation.displayName?.text}</h3>
      <p>{selectedStation.formattedAddress}</p>
      <div className="button-container">
        {/* We can either change the page by state or we can change
         * by navigation This is a reminder to talk about it */}
        <NavLink
          to={`station/${selectedStation.id}`}
          className="view-more-design"
          onClick={closeModal}
        >
          View More
        </NavLink>
        <a
          className="view-more-design"
          target="_blank"
          rel="noopener noreferrer"
          href={selectedStation.googleMapsUri}
          onClick={closeModal}
        >
          Click for direction
        </a>
      </div>
      {/* Conditionally render an image or the no image icon */}
      <div className="image-container">
        {selectedStation &&
        selectedStation.photos &&
        selectedStation?.photos.length > 0 &&
        photoUrl ? (
          <img
            className="image"
            src={photoUrl[0]}
            alt={`${selectedStation.displayName.text} image`}
          />
        ) : (
          <div className="no-image">
            <MdImageNotSupported />
          </div>
        )}
      </div>
    </div>
  );
}

export default DisplayCard;
