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
  const { setSelectedStation } = useContext(GoogleMapContext);
  if (markerContext === "location") {
    return (
      <AdvancedMarker
        position={{ lat: position.latitude, lng: position.longitude }}
        onClick={() => setSelectedStation(station)}
      >
        {stationTypes.includes("electric_vehicle_charging_station") ? (
          <div className="icon-container">
            <img src="/evIcon.svg" className="icon"/>
          </div>
        ) : (
          <div className="icon-container">
            <img src="/gasIcon.svg" className="icon"/>
          </div>
        )}
      </AdvancedMarker>
    );
  }
  return <div>AdvanceMarkerComponent</div>;
}

export default AdvanceMarkerComponent;
