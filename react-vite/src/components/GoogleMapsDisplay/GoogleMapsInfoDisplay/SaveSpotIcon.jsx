import "./SaveSpotIcon.css";
import { FaBookmark } from "react-icons/fa";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import SaveSpotConfirmation from "./SaveSpotConfirmation";

function SaveSpotIcon() {
  // NEED TO ADD FUNCTIONALITY TO SAVE THE LOCATION TO THE DATABASE

  return (
    <div>
      <OpenModalMenuItem
        itemText={<FaBookmark className="bookmark-icon" />}
        modalComponent={<SaveSpotConfirmation />}
      />
    </div>
  );
}

export default SaveSpotIcon;
