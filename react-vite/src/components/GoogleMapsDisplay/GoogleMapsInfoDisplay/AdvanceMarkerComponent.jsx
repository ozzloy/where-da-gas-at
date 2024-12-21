import { AdvancedMarker } from "@vis.gl/react-google-maps";

function AdvanceMarkerComponent({
  markerContext = "location",
  position,
  stationTypes,
}) {
  if (markerContext === "location") {

    return (
      <AdvancedMarker
        position={{ lat: position.latitude, lng: position.longitude }}
      >
        {!stationTypes.includes("electric_vehicle_charging_station") ? (
          <div>
            <img src="/evIcon.svg" width={32} height={32} />
          </div>
        ) : (
          <div>
            <img src="/gasIcon.svg" width={32} height={32} />
          </div>
        )}
      </AdvancedMarker>
    );
  }
  return <div>AdvanceMarkerComponent</div>;
}

export default AdvanceMarkerComponent;
