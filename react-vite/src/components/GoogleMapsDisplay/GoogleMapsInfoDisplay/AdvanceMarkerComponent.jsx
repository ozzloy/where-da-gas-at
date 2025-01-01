import { AdvancedMarker } from "@vis.gl/react-google-maps";
import "./AdvanceMarkerComponent.css";
import { useContext } from "react";
import { GoogleMapContext } from "../../../context/GoogleMapContext";

function AdvanceMarkerComponent({
  markerContext = "location",
  position,
  stationTypes,
  station,
}) {
  const { setSelectedStation, setZoom, setNewCenter } =
    useContext(GoogleMapContext);

  const onClickHandler = () => {
    setSelectedStation(station);
    setZoom(16);
    setNewCenter({ lat: position.latitude, lng: position.longitude });
  };
  if (markerContext === "location") {
    return (
      <AdvancedMarker
        position={{ lat: position.latitude, lng: position.longitude }}
        onClick={onClickHandler}
      >
        {stationTypes.includes(
          "electric_vehicle_charging_station",
        ) ? (
          <div className="icon-container">
            <img src="/evIcon.svg" className="icon" />
          </div>
        ) : (
          <div className="icon-container">
            <img src="/gasIcon.svg" className="icon" />
          </div>
        )}
      </AdvancedMarker>
    );
  }
  return <div>AdvanceMarkerComponent</div>;
}

export default AdvanceMarkerComponent;
