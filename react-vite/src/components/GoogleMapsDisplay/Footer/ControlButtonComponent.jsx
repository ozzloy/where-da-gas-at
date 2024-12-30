import { FaMapMarkerAlt } from "react-icons/fa";
import { useContext } from "react";
import { GoogleMapContext } from "../../../context/GoogleMapContext";
import { FaBookmark, FaTimes, FaCommentAlt, FaBars } from "react-icons/fa";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import "./ControlButtonComponent.css";
import SavedSpotsComponent from "../ControlCRUDComponents/SavedSpotsComponent";
import UserReviewsDisplay from "../ControlCRUDComponents/UserReviewsDisplay";
import { useSelector } from "react-redux";

function ControlButtonComponent() {
  const {
    setNewCenter,
    openSideMenu,
    setOpenSideMenu,
    center,
    setSelectedStation,
    setZoom,
  } = useContext(GoogleMapContext);

  //only display when the user is login
  const sessionUser = useSelector((state) => state.session.user);

  const handleButtonClick = () => {
    setSelectedStation(null);
    setNewCenter(center);
    setZoom(15);
  };

  return (
    <div className="control-buttons-container">
      {/* This is the button that will find the current location of the user 
        and change the position of the map. If you want to edit it ctrl click into it.*/}
      <button
        onClick={() => setOpenSideMenu((prev) => !prev)}
        className="icon-container"
      >
        {openSideMenu ? (
          <FaTimes className={`control-button`} />
        ) : (
          <FaBars className={`control-button`} />
        )}
      </button>

      <div className="crud-buttons-container">
        {/* Either these buttons will take you to another page or have a modal pop up that will display this data */}

        {sessionUser && sessionUser.id && (
          <>
            <OpenModalMenuItem
              itemText={
                <button className="control-button user-interaction-button">
                  <FaBookmark className="bookmark control-button user-interaction-button" />
                </button>
              }
              modalComponent={<SavedSpotsComponent />}
            />
            <OpenModalMenuItem
              itemText={
                <button className="control-button user-interaction-button">
                  <FaCommentAlt className="reviews control-button user-interaction-button" />
                </button>
              }
              modalComponent={<UserReviewsDisplay />}
            />
          </>
        )}
      </div>
      {/* This is the side menu display. When a user clicks the side menu button this will open up
        and display the nearby stations and other settings. If you want to edit it ctrl click into it.
        */}
      <div className="icon-container" onClick={handleButtonClick}>
        <FaMapMarkerAlt className="control-button" />
      </div>
    </div>
  );
}

export default ControlButtonComponent;
